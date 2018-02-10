import React, {Component} from 'react';
import {graphql, withApollo} from 'react-apollo';
import {GET_ALL_TRACKS, UPDATE_PLAY_COUNT} from "../../graphql/queries";
import gql from 'graphql-tag'
import TrackPlayer from './TrackPlayer'
import './TrackDisplayContainer.css'

class TrackDisplayContainer extends Component {

    constructor(props) {
        super(props);
        this.togglePlayAudio = this.togglePlayAudio.bind(this);
        this.incrementPlayCount = this.incrementPlayCount.bind(this);
        this.updateGenre = this.updateGenre.bind(this);
    }

    state = {
        tracks: '',
        trackInd: 0,
        source: undefined,
        isPlaying: false
    };

    componentWillReceiveProps(nextProps) {

        if (nextProps.data.getAllTracks) {
            // console.log("componentWillReceiveProps", nextProps.data.getAllTracks);
            let propsToString = nextProps.data.getAllTracks.map((track, ind) => {
                return (
                    <li key={track.filename}>

                        <a onClick={() => this.loadAudioPlayerAndPlay(track.filename, ind, track.playCount)}>{track.title} - {track.artist}</a> - PLAYS: {track.playCount}

                    </li>
                )
            });
            this.setState({
                tracks: propsToString
            });
        }
    }

    togglePlayAudio() {
        let status = this.state.isPlaying;
        let audio = document.getElementById('audio');
        if (!status) {
            status = true;
            audio.play();
        } else {
            status = false;
            audio.pause();
        }
        this.setState({isPlaying: status});
    }

    loadAudioPlayerAndPlay(filename, ind, pCount) {
        // console.log("loadAudioPlayerAndPlay", filename, ind, pCount)
        let audio = document.getElementById('audio');
        this.setState({
            trackInd: ind,
            source: encodeURI(`../${this.props.data.getAudioFilePath + filename}`),
        });
        audio.load();
        audio.oncanplay = () => {
            audio.play();
            this.setState({isPlaying: true});
        };
        this.incrementPlayCount(ind, pCount);
        this.updateGenre(ind);
    }

    updateGenre(ind) {
        const myNewGenre = {
            "genre": this.props.data.getAllTracks[ind].genre[0] || "default"
        };

        this.props.client.writeQuery({
            query: gql`mutation MyGenre ($input: input) {
                            genre 
                      }`,
            data: myNewGenre
        });

    }

    incrementPlayCount(ind, pCount) {
        console.log("PLAYING ID: ", ind, pCount);
        pCount+=1;
        let input = {
            "id": this.props.data.getAllTracks[ind].id,
            "newCount": pCount
        };
        this.props.client.mutate({
            mutation: UPDATE_PLAY_COUNT,
            variables: {"input" : input},
        })
    }

    render() {

        const {data} = this.props;

        if (data.loading) {
            return <div>LOADING</div>

        } else {
            return (

                <div className="track-container">
                        <div>
                            <ul>{this.state.tracks}</ul>
                            <div>
                                <TrackPlayer
                                    track={data.getAllTracks ? data.getAllTracks[this.state.trackInd] : {}}
                                    isPlaying={this.state.isPlaying}
                                    toggleAudio={this.togglePlayAudio}
                                />
                            </div>
                        </div>
                    <audio id="audio" src={this.state.source || (encodeURI(`../${data.getAudioFilePath + data.getAllTracks[0].filename}`) || '')}/>
                </div>
            )
        }
    }
}
let GraphQLTrackDisplayContainer = graphql(GET_ALL_TRACKS)(TrackDisplayContainer);
export default withApollo(GraphQLTrackDisplayContainer);
