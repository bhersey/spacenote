import React, {Component} from 'react';
import {graphql, withApollo} from 'react-apollo';
import ReactPlayer from 'react-player'
import {GET_ALL_VIDEOS} from "../../graphql/queries";
import './VideoDisplayContainer.css'

class VideoDisplayContainer extends Component {

    state = {
        videos: [],
        videoID: '',
        videoURL: '',
        isPlaying: false
    };

    loadVideoPlayerAndPlay(id, url) {
        console.log("VIDEO: ", id, url)
        // let player = this.rplayer;
        this.setState({
            videoURL: id,
        });
        console.log(ReactPlayer.canPlay(this.state.videoID));
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.data.getAllVideos) {
            console.log("componentWillReceiveProps", nextProps.data.getAllVideos[0].id, nextProps.data.getAllVideos[0].url);
            let propsToString = nextProps.data.getAllVideos.map((video) => {
                return (
                    <li key={video.id}>

                        <a onClick={() => this.loadVideoPlayerAndPlay(video.url, video.id)}>{video.title} - {video.client}</a>

                    </li>
                )
            });
            this.setState({
                videos: propsToString,
                videoURL: nextProps.data.getAllVideos[0].url,
                videoID: nextProps.data.getAllVideos[0].id,
            })
            console.log("STATE", this.state);
        }
    }

    render() {

        const {data} = this.props;

        if (!data.loading) {

            return (
                <div className="video-container">
                    <div>
                        <ul>{this.state.videos}</ul>
                        <div>
                            <ReactPlayer
                                ref={(c) => this.rplayer = c}
                                url={this.state.videoURL} />
                        </div>
                    </div>
                </div>
            )
        } else {
            return <div>LOADING</div>
        }

    }
}

let GraphQLVideoDisplayContainer = graphql(GET_ALL_VIDEOS)(VideoDisplayContainer);
export default withApollo(GraphQLVideoDisplayContainer);
