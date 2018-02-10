import React from 'react';
import Anime from 'react-anime';
import {compose, lifecycle, pure} from 'recompose';
import TrackDisplayContainer from "./trackdisplay/TrackDisplayContainer";
import {PAGE_TRANSITION} from "../animation/animConstants";
import './MusicView.css'

const MusicView = ({contentToAnimate}, props) => {

    console.log("MusicView", props);

    return (
        <div>
            {contentToAnimate}
        </div>
    )
};

const withLifeCycle = lifecycle({
    componentWillMount() {
        this.setState({
            contentToAnimate:
                <Anime {...PAGE_TRANSITION} >
                    <div className="music-view">
                        MUSIC VIEW
                        <TrackDisplayContainer/>
                    </div>
                </Anime>
        })
    }
});

const EnhancedMusicView = compose(
    withLifeCycle,
    pure
)(MusicView);

export default EnhancedMusicView
