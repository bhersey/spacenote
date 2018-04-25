import React from 'react';
import Anime from 'react-anime';
import {compose, lifecycle, pure} from 'recompose';
import TrackDisplayContainer from "./trackdisplay/TrackDisplayContainer";
import {PAGE_TRANSITION} from "../animation/animConstants";
import VisualizerContainer from "./visualizers/VisualizerContainer";
import {INIT_GENRE} from "../graphql/queries";
import {graphql} from "react-apollo/index";

const LandingView = ({data: {loading, error, genre},contentToAnimate}) => {

    return (
        <div>
            <VisualizerContainer {...{loading, error, genre}}>
                {contentToAnimate}
            </VisualizerContainer>
        </div>
    )
};

const withLifeCycle = lifecycle({
    componentWillMount() {
        this.setState({
            contentToAnimate:
                <Anime {...PAGE_TRANSITION}>
                    <div className="landing-view">
                        <TrackDisplayContainer />
                    </div>
                </Anime>
        })
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            console.log("MusicView componentWillReceiveProps",this.props.data.genre);
        }
    }
});

const EnhancedLandingView = compose(
    graphql(INIT_GENRE, {
        options: {
            fetchPolicy: 'cache-only',
            errorPolicy: 'all'
        }
    }),
    withLifeCycle,
    pure
)(LandingView);

export default EnhancedLandingView;