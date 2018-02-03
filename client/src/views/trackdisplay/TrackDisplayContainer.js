import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {convertSecondsToTime} from '../../utilities/dataTransformations'
import {GET_ALL_TRACKS, HELLO} from "../../graphql/queries";
import TrackPlayer from './TrackPlayer'
import './TrackDisplayContainer.css'

class TrackDisplayContainer extends Component {

    constructor(props) {
        super(props);
        this.togglePlayAudio = this.togglePlayAudio.bind(this);
    }

    state = {
        tracks: [],
        player: null,
        isPlaying: false,
        source: ""
    };

    togglePlayAudio(filename) {
        console.log("togglePlayAudio", this.state.isPlaying, `../${this.props.data.getAudioFilePath+filename}`, document.getElementById('audio'));
        let status = this.state.isPlaying;
        let audio = document.getElementById('audio');
        if(!status) {
            status = true;
            setTimeout(function () {
                console.log("PLAYING!")
                audio.play();
            },100);
            // let that = this;
            // setInterval(function() {
            //     let currentTime = audio.currentTime;
            //     let duration = that.props.track.duration;
            //
            //     // Calculate percent of song
            //     let percent = (currentTime / duration) * 100 + '%';
            //     that.updateScrubber(percent);
            //     that.updateTime(currentTime);
            // }, 100);
        } else {
            status = false;
            audio.pause();
        }
        this.setState({ isPlaying: status });

    }

    loadAudioPlayer(filename) {

        let status = this.state.isPlaying;
        let audio = document.getElementById('audio');
        if(!status) {
            console.log("loadAudioPlayer", `../${this.props.data.getAudioFilePath+filename}`);
            this.setState({
                            source: encodeURI(`../${this.props.data.getAudioFilePath+filename}`),
                            player: <TrackPlayer
                                filename={filename}
                                isPlaying={this.state.isPlaying}
                                toggleAudio={this.togglePlayAudio}
                            />
                        });
            audio.load();
        }
    }


    componentWillReceiveProps(newProps) {

        if (newProps.data.getAllTracks) {
            console.log(JSON.stringify(newProps.data.getAudioFilePath));
            let propsToString = newProps.data.getAllTracks.map((track) => {

                return <li key={track.filename}>
                    <a href="javascript:void(0);" onClick={() => this.loadAudioPlayer(track.filename)} >{track.title} - {track.artist}</a>
                </li>

            });

            this.setState({
                tracks: propsToString
            })
        }

    }

    render() {

        const { data } = this.props;

        console.log("LOADING?", data.loading); // <- The data returned by your query for `viewer`.
        console.log(data.error);

        !data.loading ? console.log(data.getAllTracks) : console.log("YoU SUUUUUUCK");

        return (

            <div className="track-container">
                <ul>{this.state.tracks}</ul>
                <div>
                    {this.state.player}
                </div>
                <audio id="audio">
                    <source src={this.state.source} />
                </audio>
            </div>
        )
    }
}

export default graphql(GET_ALL_TRACKS)(TrackDisplayContainer);
