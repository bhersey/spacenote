import React from 'react';
import {graphql} from 'react-apollo'
import {GET_TRACK} from "../../graphql/queries";
import PlayButton from '../ui/PlayButton'
import './TrackPlayer.css';

let TrackPlayer = ({data: {loading, error, getTrack, variables}}) => {

    if (loading) {
        return <div>Loading</div>;
    } else {
        console.log("DATA", variables.isPlaying);

        return (

            <div className="track">
                <div>Title: {getTrack.title || ''}</div>
                <div>Artist: {getTrack.artist || ''}</div>
                <div>Album: {getTrack.album || ''}</div>
                <div>Year: {getTrack.year || ''}</div>
                <div>Genre: {getTrack.genre || ''}</div>
                <div>Duration: {getTrack.duration || ''}</div>
                <div>Is Playing: {variables.isPlaying.toString()}</div>
                <PlayButton
                    isPlaying={variables.isPlaying}
                    toggleAudio={variables.toggleAudio}
                />
            </div>
        );
    }
};

export default graphql(GET_TRACK, {
    options: (props) => ({
        variables: {input: props.filename, isPlaying: props.isPlaying, toggleAudio: props.toggleAudio}
    })
})(TrackPlayer);