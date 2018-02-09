import React from 'react';
import TrackDisplayContainer from "./trackdisplay/TrackDisplayContainer";
import './TrackView.css'

const TrackView = (props) => {

        return (
            <div className="track-view">
                <TrackDisplayContainer />
            </div>
        )
};

export default TrackView;