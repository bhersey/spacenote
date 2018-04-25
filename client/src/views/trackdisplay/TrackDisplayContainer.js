import React, {Component} from 'react';
import {graphql, withApollo} from 'react-apollo';
import {GET_ALL_TRACKS, UPDATE_PLAY_COUNT} from "../../graphql/queries";
import gql from 'graphql-tag'
import TrackButton from '../ui/TrackButton';
import TrackPlayer from './TrackPlayer'
import './TrackDisplayContainer.css'
import {AUDIO_CTX} from "../../audioAPI/AudioContext";

class TrackDisplayContainer extends Component {

    constructor(props) {
        super(props);
        this.loadAudioPlayerAndPlay = this.loadAudioPlayerAndPlay.bind(this);
        this.togglePlayAudio = this.togglePlayAudio.bind(this);
        this.incrementPlayCount = this.incrementPlayCount.bind(this);
        this.updateGenre = this.updateGenre.bind(this);
        this.toggleVisualization = this.toggleVisualization.bind(this);
        this.audioCtx = AUDIO_CTX;
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
                    <TrackButton
                        key={track.id}
                        ind={ind}
                        clickHandler={this.loadAudioPlayerAndPlay}
                        {...track} />
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
            this.toggleVisualization();
        } else {
            status = false;
            audio.pause();
            this.toggleVisualization();
        }
        this.setState({isPlaying: status});
    }

    loadAudioPlayerAndPlay(ind) {
        // console.log("loadAudioPlayerAndPlay", filename, ind, pCount)
        let audio = document.getElementById('audio');
        let fileToLoad = this.props.data.getAllTracks[ind].filename;
        this.setState({
            trackInd: ind,
            source: encodeURI(`../${this.props.data.getAudioFilePath + fileToLoad}`),
        });
        audio.load();
        audio.oncanplay = () => {
            audio.play();
            this.setState({isPlaying: true});
        };
        this.incrementPlayCount(ind);
        this.updateGenre(ind);
        this.toggleVisualization();
    }

    toggleVisualization(){
        // let context = new AudioContext();
        let analyser = this.audioCtx.createAnalyser();
        let canvas = this.visCanvas;
        let ctx = canvas.getContext('2d');
        let audio = document.getElementById('audio');
        audio.crossOrigin = 'anonymous';
        let audioSrc = this.audioCtx.createMediaElementSource(audio);
        function renderFrame() {
            let freqData = new Uint8Array(analyser.frequencyBinCount)
            requestAnimationFrame(renderFrame)
            analyser.getByteFrequencyData(freqData)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            console.log(freqData)
            ctx.fillStyle = '#ff1c1a';
            let bars = 100;
            for (var i = 0; i < bars; i++) {
                let bar_x = i * 3;
                let bar_width = 2;
                let bar_height = -(freqData[i] / 2);
                ctx.fillRect(bar_x, canvas.height, bar_width, bar_height)
            }
        };
        if (!this.state.isPlaying) {

            audioSrc.connect(analyser);
            audioSrc.connect(this.audioCtx.destination);
            analyser.connect(this.audioCtx.destination);


            renderFrame()
        } else {
            audioSrc.disconnect();
            analyser.disconnect();
            renderFrame = null;

        }
    }

    stopVisualization() {

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

    incrementPlayCount(ind) {
        let pCount = this.props.data.getAllTracks[ind].playCount;
        pCount++;
        console.log("PLAYING ID: ", ind, pCount);

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
                            <div className="button-container">{this.state.tracks}</div>
                            <canvas
                                className="vis-canvas"
                                ref={(canv) => this.visCanvas = canv}
                                id="analyzer"
                            >
                            </canvas>
                            <div>
                                <TrackPlayer
                                    track={data.getAllTracks ? data.getAllTracks[this.state.trackInd] : {}}
                                    isPlaying={this.state.isPlaying}
                                    toggleAudio={this.togglePlayAudio}
                                />
                            </div>
                        </div>
                    <audio controls={true} id="audio" src={this.state.source || ''}/>
                </div>
            )
        }
    }
}
let GraphQLTrackDisplayContainer = graphql(GET_ALL_TRACKS)(TrackDisplayContainer);
export default withApollo(GraphQLTrackDisplayContainer);
