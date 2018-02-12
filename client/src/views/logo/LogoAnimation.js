import React from 'react';
import {compose, lifecycle, pure} from 'recompose';
import Anime from 'react-anime';
import './LogoAnimation.css';

const LogoAnimation = ({contentToAnimate}) => {
    //lets think of an interesting way to use props here, or even apollo to change state with data (or else remove the arguments)

    return (
        <div className="anim">
            <div className="logo-animation">

                {contentToAnimate}

            </div>
        </div>
    )
};

const withLifeCycle = lifecycle({
    componentDidMount() {
        console.log('props', this.props)
        this.setState({
            contentToAnimate:
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 362.25 65.3">
                    <Anime easing="easeOutQuad"
                           duration={1200}
                           loop={false}
                           delay={(el, index) => index * 250}
                           translateY={{
                               easing: "easeInOutQuad",
                               value: [-100, 0],
                               duration: 300,
                               delay: (el, index) => index * 100
                           }}
                           rotate={{
                               value: [-90, 0],
                               duration: 500,
                               easing: 'easeInOutQuad'
                           }}
                           strokeDashoffset={(el) => {
                               let pathLength = 0;
                               if (el.getTotalLength) {
                                   pathLength = el.getTotalLength();
                                   el.setAttribute('stroke-dasharray', pathLength);
                               }
                               return [pathLength, 0];
                           }}>

                        <path className="st1"
                              d="M10.47,35.93c.72,4.46,3.6,7.42,8.86,7.42,5.62,0,7.63-2.45,7.63-6C27,32.9,24.22,31,17.09,29,5.64,25.85,1.75,21.74,1.75,14.61,1.75,5.47,9.1.5,18.46.5c11.88,0,16.85,6.12,17.43,14H26c-.65-3.6-2.38-6.41-7.63-6.41-4.46,0-6.62,2.09-6.62,5.54,0,3.67,2.52,4.68,9.5,6.7C33.87,24,37.11,29.09,37.11,36.21c0,8-5.33,14.91-18.22,14.91C8.09,51.12,1.11,45.65.53,35.93Z"/>
                        <path className="st1"
                              d="M44.09,64.8V24c0-5,.07-8.35-.07-10.8h9.5c.14,1.22.22,3.1.29,5,1.3-2.66,4.46-5.69,10.73-5.69,7.78,0,14.11,6,14.11,19,0,12.1-6.84,19.66-15.84,19.66-4.82,0-7.63-1.66-9-3.89V64.8Zm17-44.36c-5.9,0-7.7,3.31-7.7,11.45,0,7.2,1.66,11.38,7.42,11.38,5.18,0,7.92-4,7.92-11.67C68.72,23.54,65.55,20.45,61.08,20.45Z"/>
                        <path className="st1"
                              d="M114.8,40.82a88.37,88.37,0,0,0,.5,9.65h-8.57a31.27,31.27,0,0,1-.58-4.54c-1.51,3-5,5.18-10.44,5.18-9.22,0-12.46-5.76-12.46-11.38,0-6.7,4.61-12.24,17.57-12.24h4.39V24.77c0-3-.94-5.4-5.33-5.4s-5.4,2.23-5.76,5H84.7c.36-5.9,3.89-11.88,15.34-11.88,8.78,0,14.76,3.1,14.76,12.31Zm-9.29-7.06H101c-6.7,0-7.92,2.74-7.92,5.18s1.51,4.75,5.26,4.75c5.83,0,7.2-3.89,7.2-9.15Z"/>
                        <path className="st1"
                              d="M154.9,37.44c-1.08,7.49-5.83,13.68-16.27,13.68-11.45,0-16.78-7.06-16.78-19.23,0-11.81,6.55-19.44,17.35-19.44,12.17,0,15.48,8.79,15.7,14h-9.79c-.36-3.38-1.87-6.48-6.12-6.48-5.11,0-7.2,4.75-7.2,11.59,0,8.71,2.59,12.17,7.06,12.17,4.18,0,5.54-2.74,6.34-6.26Z"/>
                        <path className="st1"
                              d="M169.51,34.05c0,4.54,1.73,9.43,7.27,9.43,4.46,0,5.83-2.81,6.41-4.46h9.58c-1.8,6.19-6.19,12.1-16.27,12.1-11.88,0-16.85-8.14-16.85-19.23,0-9.22,4.61-19.44,17.28-19.44S193.2,21.38,193.2,31c0,.5-.07,2.45-.14,3Zm14.18-6.41c-.14-4.18-1.87-7.85-6.91-7.85-5.54,0-6.91,4.54-7.13,7.85Z"/>
                    </Anime>
                    <Anime easing="easeOutQuad"
                           duration={1200}
                           loop={false}
                        // direction={'reverse'}
                           delay={(el, index) => index * 250}
                           translateY={{
                               easing: "easeInOutQuad",
                               value: [100, 0],
                               duration: 300,
                               delay: (el, index) => index * 100
                           }}
                           strokeDashoffset={(el) => {
                               let pathLength = 0;
                               if (el.getTotalLength) {
                                   pathLength = el.getTotalLength();
                                   el.setAttribute('stroke-dasharray', pathLength);
                               }
                               return [pathLength, 0];
                           }}>

                        <path className="st1"
                              d="M338.06,34.05c0,4.54,1.73,9.43,7.27,9.43,4.46,0,5.83-2.81,6.41-4.46h9.58c-1.8,6.19-6.19,12.1-16.27,12.1-11.88,0-16.85-8.14-16.85-19.23,0-9.22,4.61-19.44,17.28-19.44S361.75,21.38,361.75,31c0,.5-.07,2.45-.14,3Zm14.18-6.41c-.14-4.18-1.87-7.85-6.91-7.85-5.54,0-6.91,4.54-7.13,7.85Z"/>
                        <path className="st1"
                              d="M303.5,13.17h5.26V3.09h9.72V13.17h6.62v7.63h-6.62V40c0,2.52.65,3.6,3.67,3.6a12.4,12.4,0,0,0,2.23-.14v6.7a21.29,21.29,0,0,1-6,.72c-7.2,0-9.65-2.88-9.65-9.79V20.81H303.5Z"/>
                        <path className="st1"
                              d="M300.34,31.32c0,10.87-5.18,19.87-17.86,19.87-13,0-17.57-9.58-17.57-19.66,0-9.29,5.26-19.08,18.07-19.08C294.94,12.45,300.34,21.24,300.34,31.32Zm-25.49-.07c0,8,2.74,12.24,8,12.24,4.9,0,7.63-4.25,7.63-12.1,0-7.42-2.59-11.23-7.92-11.23C277.58,20.16,274.85,24.48,274.85,31.25Z"/>
                        <path className="st1"
                              d="M218.26,50.47V1.15h12.82c14.69,30,17.07,34.92,17.79,37.3H249c-.5-5.9-.58-14-.58-22V1.15h9.22V50.47H245.33c-15.77-33.05-17.5-37-18.22-38.88H227c.36,6.26.36,14.76.36,23.62V50.47Z"/>
                    </Anime>
                </svg>
        })
    }
});

const EnhancedLogoAnimation = compose(
    withLifeCycle,
    pure
)(LogoAnimation);

export default EnhancedLogoAnimation
