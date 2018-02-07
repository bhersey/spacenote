import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo';
import {GET_ALL_TRACKS, GET_TRACK, UPDATE_PLAY_COUNT} from "../../graphql/queries";
import TrackPlayer from './TrackPlayer'
import './TrackDisplayContainer.css'

class TrackDisplayContainer extends Component {

    constructor(props) {
        super(props);
        this.togglePlayAudio = this.togglePlayAudio.bind(this);
        this.incrementPlayCount = this.incrementPlayCount.bind(this);
    }

    state = {
        tracks: [],
        trackID: '',
        playerFile: '',
        source: '',
        isPlaying: false
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

    loadAudioPlayerAndPlay(filename, id) {
        let audio = document.getElementById('audio');
        this.setState({
            source: encodeURI(`../${this.props.data.getAudioFilePath + filename}`),
            playerFile: filename
        });
        audio.load();
        audio.oncanplay = () => {
            audio.play();
            this.setState({isPlaying: true});
            this.incrementPlayCount(id);
        };
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.data.getAllTracks) {
            console.log("componentWillReceiveProps", nextProps.data.getAllTracks[0].id, nextProps.data.getAllTracks[0].filename);
            let propsToString = nextProps.data.getAllTracks.map((track) => {
                return (
                <li key={track.filename}>

                    <a onClick={() => this.loadAudioPlayerAndPlay(track.filename, track.id)}>{track.title} - {track.artist}</a>

                </li>
                )
            });
            this.setState({
                tracks: propsToString,
                source: encodeURI(`../${nextProps.data.getAudioFilePath + nextProps.data.getAllTracks[0].filename}`),
                trackID: nextProps.data.getAllTracks[0].id,
                playerFile: nextProps.data.getAllTracks[0].filename
            })
           console.log("STATE", this.state);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.trackID !== this.state.trackID) {
            this.checkQuery()
        }
    }

    incrementPlayCount(id) {
        console.log("PLAYING ID: ", id);
        let input = {
            "id": id,
            "newCount": 13
        }
        const updatePlays = this.props.client.mutate({
            mutation: UPDATE_PLAY_COUNT,
            variables: {"input" : input},
            update: (proxy, { data: { updatePlayCountResult } }) => {
                // Read the data from our cache for this query.
                const data = proxy.readQuery({ query: gql`Track {id, title, playCount}`});

                console.log("MUTATION DATA", data)

                // // Add our todo from the mutation to the end.
                // data.getTrack.push(updatePlayCountResult);
                //
                // // Write our data back to the cache.
                // proxy.writeQuery({ query: TodoAppQuery, data });
            },
        })
    }


    checkQuery() {


        const todo = this.props.client.readFragment({
            id: this.state.trackID,
            fragment: gql`
                    fragment myTrack on Track {
                        id
                        filename
                        title
                        artist
                    }
                    `,
        });

        console.log("CLIENT", todo);
    }

    render() {

        const {data} = this.props;

        // console.log(data.loading);
        if (!data.loading) {

            return (

                <div className="track-container">
                    {!data.loading ?
                        <div>
                            <ul>{this.state.tracks}</ul>
                            <div>
                                <TrackPlayer
                                    id={this.state.trackID}
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
        } else {
             return <div>LOADING</div>
        }

    }
}
let GraphQLTrackDisplayContainer = graphql(GET_ALL_TRACKS)(TrackDisplayContainer);
export default withApollo(GraphQLTrackDisplayContainer);
