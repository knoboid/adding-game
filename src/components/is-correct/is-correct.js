import React, { Component } from 'react';
import './is-correct.css';

/*
Eye-candyish animation effect showing if a sum has been answered correctly.
Props:
correct: null if no answer is provided (displays a grey disc).
         true if the answer is correct (displays a green tick).
         false if the answer is incorrect (displays a red cross).
duration: how long the animation takes.
*/
class IsCorrect extends Component {
	constructor(props) {
        super(props);
        this.angle = 0;
        this.interval = null;
        this.state = {
            prevImage: 'none',
            image: 'none',
            displayedImage: 'none',
            imageHeight: 1.2,
            angle: 0,
        };
    }

    // When the parent makes a change to the props, update the image.
    static getDerivedStateFromProps(nextProps, prevState) {
        prevState.prevImage = prevState.image || 'none';
        prevState.image = IsCorrect.image(nextProps);
        return null;
    }

    // Map the 'correct' property to the corresponding image.
    static image(props) {
        if (props.correct===null) {
            return 'none';
        }
        else if (props.correct===true) {
            return 'tick';
        }
        else {
            return 'cross';
        }
    }

    stopAnimation() {
        clearInterval(this.interval);
        this.interval = null;
        this.setState((prevState, props) => ({
            angle: 0,
        }));
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // Do some house-keeping after each frame render.
    componentDidUpdate() {
        if (this.state.prevImage !== this.state.image) {
            // Start new animation if the correct prop changes.
            this.startAnimation();
        }
        else if (this.state.angle === 90) {
            // Skip the middle 180 degrees (half rotation)
            // at the 90 degree point.
            // This is the point at which the component flips and
            // the 'other side' of the image becomes visible, 
            // so change which image is displayed in order to 
            // reflect the new state of the component.
            this.setState((prevState, props) => ({
                angle: 270,
                displayedImage: prevState.image,
            }));   
        }
        // Stop the animation at 360 degs.
        else if (this.state.angle === 360) {
            this.stopAnimation();
        }

        if(this.state.angle !== this.angle) {
            // Calculate the new image height if the angle has been 
            // updated (which is done inside setInterval).
            this.angle = this.state.angle
            this.setState((prevState, props) => ({
                imageHeight: 1.2 * Math.cos(prevState.angle*Math.PI/180)
            }));
        }
    }

    startAnimation() {
        // If we're currently animating, then stop.
        if (this.interval) {
            this.stopAnimation();
        }
        // Start the animation.
        this.interval = setInterval(() => {
            this.setState((prevState, props) => ({
                angle: prevState.angle + 10
            }));
        }, this.props.duration * (1000/18));
    }

    render() {
        let c = "correct-" + this.state.displayedImage;
        let h = this.state.imageHeight;
		return (
			<span className="is-correct-container">
                <span
                    style={{backgroundSize: "1.2em " + h + "em"}}
                    className={
                        'is-correct-inner ' + c
                    }
                />
			</span>
		);
	}
}

export default IsCorrect;
