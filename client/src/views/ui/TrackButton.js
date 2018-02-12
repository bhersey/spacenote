import React from 'react';
import './TrackButton.css'

const TrackButton = (props) => {

    return(
        <div className="track-button" onClick={() => props.clickHandler(props.ind)}>
            <div>
                {props.title}
            </div>
            <div>
                {props.artist}
            </div>
        </div>
    )
};

export default TrackButton;