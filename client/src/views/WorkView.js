import React from 'react';
import Anime from 'react-anime';
import {compose, lifecycle, pure} from 'recompose';
import {PAGE_TRANSITION} from "../animation/animConstants";
import VideoDisplayContainer from "./videodisplay/VideoDisplayContainer";
// import './WorkView.css'

const WorkView = ({contentToAnimate}) => {

    console.log("WorkView");

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
                    <div className="work-view">
                        WORK VIEW
                        <VideoDisplayContainer />
                    </div>
                </Anime>
        })
    }
});

const EnhancedWorkView = compose(
    withLifeCycle,
    pure
)(WorkView);

export default EnhancedWorkView