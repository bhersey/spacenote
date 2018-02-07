import React from 'react';
import {graphql} from 'react-apollo'
import {GET_TRACK} from "../../graphql/queries";
import PlayButton from '../ui/PlayButton'
import './TrackPlayer.css';

let TrackPlayer = ({data: {loading, error, getTrack, variables}}) => {

    // console.log("DATA", loading, getTrack, error);

    if (loading) {
        return <div>Loading</div>;

    } else {



        return (

            <div className="track">
                <div>Title: {getTrack.title || ''}</div>
                <div>Artist: {getTrack.artist || ''}</div>
                <div>Album: {getTrack.album || ''}</div>
                <div>Year: {getTrack.year || ''}</div>
                <div>Genre: {getTrack.genre || ''}</div>
                <div>Duration: {getTrack.duration || ''}</div>
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
        variables: {input: props.id, isPlaying: props.isPlaying, toggleAudio: props.toggleAudio},
        errorPolicy: 'all'
    })
})(TrackPlayer);