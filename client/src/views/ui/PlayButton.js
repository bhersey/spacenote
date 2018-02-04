import React from 'react';

import './PlayButton.css';


const PlayButton = (props, state) => (
    <button className={`play-button ${props.isPlaying ? 'active' : ''}`}  onClick={() => props.toggleAudio()}>
        PLAY
    </button>
);

export default PlayButton;