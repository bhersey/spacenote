import React from 'react';
import PlayButton from '../ui/PlayButton'
import './TrackPlayer.css';

let TrackPlayer = (props) => {

    return (
        <div className="track">
            <div>Title: {props.track.title || ''}</div>
            <div>Artist: {props.track.artist || ''}</div>
            <div>Album: {props.track.album || ''}</div>
            <div>Year: {props.track.year || ''}</div>
            <div>Genre: {props.track.genre || ''}</div>
            <div>Duration: {props.track.duration || ''}</div>
            <PlayButton
                isPlaying={props.isPlaying}
                toggleAudio={props.toggleAudio}
            />
        </div>
    );
};

export default TrackPlayer;