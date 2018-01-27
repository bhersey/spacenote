import React from 'react';
import './TrackDisplay.css';

let TrackDisplay = (props, state) => (


    <div className="track">
        <div>Title: {props.title}</div>
        <div>Artist: {props.artist}</div>
        <div>Album: {props.album}</div>
        <div>Year: {props.year}</div>
    </div>
);

export default TrackDisplay;