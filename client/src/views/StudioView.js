import React from 'react';
import Anime from 'react-anime';
import {compose, lifecycle, pure} from 'recompose';
import {PAGE_TRANSITION} from "../animation/animConstants";
// import './StudioView.css'

const StudioView = ({contentToAnimate}, props) => {

    console.log("StudioView", props);

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
                    <div className="studio-view">
                        STUDIO VIEW
                    </div>
                </Anime>
        })
    }
});

const EnhancedStudioView = compose(
    withLifeCycle,
    pure
)(StudioView);

export default EnhancedStudioView