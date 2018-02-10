import React from 'react';
import Anime from 'react-anime';
import {compose, lifecycle, pure} from 'recompose';
import {PAGE_TRANSITION} from "../animation/animConstants";
// import './ContactView.css'

const ContactView = ({contentToAnimate}, props) => {

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
                    <div className="contact-view">
                        CONTACT VIEW
                    </div>
                </Anime>
        })
    }
});

const EnhancedContactView = compose(
    withLifeCycle,
    pure
)(ContactView);

export default EnhancedContactView