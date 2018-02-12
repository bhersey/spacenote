import React from 'react';
import PlayButton from '../ui/PlayButton'
import './TrackPlayer.css';

let TrackPlayer = ({track, isPlaying, toggleAudio}) => {

    return (
        <div className="track">
            <div>Title: {track.title || ''}</div>
            <div>Artist: {track.artist || ''}</div>
            <div>Album: {track.album || ''}</div>
            <div>Year: {track.year || ''}</div>
            <div>Genre: {track.genre || ''}</div>
            <div>Duration: {track.duration || ''}</div>
            <div>Plays: {track.playCount || ''}</div>
            <PlayButton
                isPlaying={isPlaying}
                toggleAudio={toggleAudio}
            />
        </div>
    );
};

export default TrackPlayer;