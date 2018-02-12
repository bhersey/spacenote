import React from 'react';
import Anime from 'react-anime';
import {graphql} from 'react-apollo'
import {compose, lifecycle, pure} from 'recompose';
import TrackDisplayContainer from "./trackdisplay/TrackDisplayContainer";
import {PAGE_TRANSITION} from "../animation/animConstants";
import {INIT_GENRE} from "../graphql/queries";
import './MusicView.css'
import VisualizerContainer from "./visualizers/VisualizerContainer";

const MusicView = ({data: {loading, error, genre},contentToAnimate}) => {

    console.log("MusicView", loading, error, genre);

    return (
        <div>
            <VisualizerContainer {...{loading, error, genre}}>
            {contentToAnimate}
            </VisualizerContainer>
        </div>
    )
};

const withLifeCycle = lifecycle({
    componentDidMount() {
        console.log('props', this.props)
        this.setState({
            contentToAnimate:
                <Anime {...PAGE_TRANSITION} >
                    <div className="music-view">
                        MUSIC VIEW: {this.genre}
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

const EnhancedMusicView = compose(
    graphql(INIT_GENRE, {
        options: {
            fetchPolicy: 'cache-only',
            errorPolicy: 'all'
        }
    }),
    withLifeCycle,
    pure
)(MusicView);

export default EnhancedMusicView
