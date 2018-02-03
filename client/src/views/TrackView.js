import React, {Component} from 'react';
import TrackDisplayContainer from "./trackdisplay/TrackDisplayContainer";

class TrackView extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <TrackDisplayContainer />
            </div>
        )
    }
}

export default TrackView;