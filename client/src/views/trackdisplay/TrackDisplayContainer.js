import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {GET_ALL_TRACKS} from "../../graphql/queries";
import TrackPlayer from './TrackPlayer'
import './TrackDisplayContainer.css'

class TrackDisplayContainer extends Component {

    constructor(props) {
        super(props);
        this.togglePlayAudio = this.togglePlayAudio.bind(this);
    }

    state = {
        tracks: [],
        playerFile: '',
        isPlaying: false,
        source: ''
    };

    togglePlayAudio() {
        console.log("togglePlayAudio", this.state.isPlaying);
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

    loadAudioPlayerAndPlay(filename) {
        let audio = document.getElementById('audio');
        this.setState({
            source: encodeURI(`../${this.props.data.getAudioFilePath + filename}`),
            playerFile: filename
        });
        audio.load();
        audio.oncanplay = function () {
            audio.play();
        };
        this.setState({isPlaying: true});
    }

    componentWillReceiveProps(newProps) {

        if (newProps.data.getAllTracks) {
            console.log(JSON.stringify(newProps.data.getAudioFilePath));
            let propsToString = newProps.data.getAllTracks.map((track) => {
                return (
                <li key={track.filename}>
                    <a href="javascript:void(0);"
                       onClick={() => this.loadAudioPlayerAndPlay(track.filename)}>{track.title} - {track.artist}</a>
                </li>
                )
            });
            this.setState({
                tracks: propsToString,
                source: encodeURI(`../${newProps.data.getAudioFilePath + newProps.data.getAllTracks[0].filename}`),
                playerFile: newProps.data.getAllTracks[0].filename
            })
        }
    }

    render() {

        const {data} = this.props;

        // console.log(data.loading);

        return (

            <div className="track-container">
                {!data.loading ?
                    <div>
                        <ul>{this.state.tracks}</ul>
                        <div>
                            <TrackPlayer
                                filename={this.state.playerFile}
                                isPlaying={this.state.isPlaying}
                                toggleAudio={this.togglePlayAudio}
                            />
                        </div>
                    </div>
                    : null
                }
                <audio id="audio" src={this.state.source}/>
            </div>
        )
    }
}

export default graphql(GET_ALL_TRACKS)(TrackDisplayContainer);
