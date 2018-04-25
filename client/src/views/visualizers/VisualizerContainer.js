import React, {Component} from 'react';
import anime from 'animejs';
import {GENRE_TO_COLOR_MAPPING} from './BackgroundColorMappings'

class VisualizerContainer extends Component {
// const VisualizerContainer = (props) => {

    state = {
      lastColor: "rgba(0,0,0,0)"
    };

    componentWillReceiveProps(newProps){
        console.log("VisualizerContainer", newProps, this.state.lastColor);

        if (newProps.genre) {
            let bgContainer = this.bgContainer;
            let nextColor = GENRE_TO_COLOR_MAPPING[newProps.genre];
            this.createTest(bgContainer, nextColor);
        }
    }

    createTest(el, nColor) {
        anime({
            targets: el,
            backgroundColor: [this.state.lastColor, nColor],
            easing: 'easeInOutQuad',
            duration: 1500
        });
        this.setState({
            lastColor: nColor
        })
    }

    // background-color: blueviolet;
    render() {
        return (
            <div>
                <div ref={(c) => this.bgContainer = c} >
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default VisualizerContainer;
