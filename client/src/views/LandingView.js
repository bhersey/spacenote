import React from 'react';
import Anime from 'react-anime';
import {compose, lifecycle, pure} from 'recompose';
import LogoAnimation from "./logo/LogoAnimation";
import {PAGE_TRANSITION} from "../animation/animConstants";

const LandingView = ({contentToAnimate}, props) => {

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
                <Anime {...PAGE_TRANSITION}>
                    <div className="landing-view">
                        <LogoAnimation/>
                    </div>
                </Anime>
        })
    }
});

const EnhancedLandingView = compose(
    withLifeCycle,
    pure
)(LandingView);

export default EnhancedLandingView