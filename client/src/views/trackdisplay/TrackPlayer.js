import React from 'react';
import {graphql} from 'react-apollo'
import {GET_TRACK} from "../../graphql/queries";
import PlayButton from '../ui/PlayButton'
import './TrackPlayer.css';

let TrackPlayer = ({data: {loading, getTrack}}) => {


    if (loading) {
        return <div>Loading</div>;
    } else {
        console.log("DATA", getTrack, this);

        return (

            <div className="track">
                <div>Title: {getTrack.title || ''}</div>
                <div>Artist: {getTrack.artist || ''}</div>
                <div>Album: {getTrack.album || ''}</div>
                <div>Year: {getTrack.year || ''}</div>
                <div>Genre: {getTrack.genre || ''}</div>
                <div>Duration: {getTrack.duration || ''}</div>
                {/*<div>Is Playing: {getTrack.isPlaying.toString()}</div>*/}
                {/*<PlayButton*/}
                {/*isPlaying={data.isPlaying}*/}
                {/*toggleAudio={data.toggleAudio}*/}
                {/*filename={data.filename}/>*/}
            </div>
        );
    }
};

export default graphql(GET_TRACK, {
    options: (props) => ({
        variables: {input: props.filename},
    })
})(TrackPlayer);