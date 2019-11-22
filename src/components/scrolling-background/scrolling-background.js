import React, { Component } from 'react';
import './scrolling-background.css';
import StyledCSSAnimation from '../styled-css-animation/styled-css-animation';

/*
Scrolls content (child elements) horizontally.
Props:
duration: time taken to traverse the parent element.
xoffset: initial x offset.
yoffset: y offset.
z: z-index
direction: direction component. +ve moves left to right.
*/
class ScrollingBackground extends Component {
	constructor(props) {
		super(props);
    	this.duration = props.duration || 60;
		this.xoffset = props.xoffset || 0;
		this.yoffset = props.yoffset || 0;
		this.direction = props.direction || 1;
    	this.z = props.z || 0;
	}

	render() {
		let { xoffset, duration, direction} = this;
		return (
			<div style={{position: "absolute", top: this.yoffset, width: "100%"}}>
				<div style={{position: "absolute", top: "0px", width: "100%", zIndex: this.z }}>
					<div className="scrollBGContainer">
						<StyledCSSAnimation offset={xoffset} duration={duration} direction={direction}>
							{this.props.children}
						</StyledCSSAnimation>
					</div>
				</div>
				<div style={{position: "absolute", top: "0px", width: "100%", zIndex: this.z }}>
					<div className="scrollBGContainer">
						<StyledCSSAnimation offset={xoffset - direction * 100} duration={duration} direction={direction}>
							{this.props.children}
						</StyledCSSAnimation>
					</div>
				</div>
				<div style={{position: "absolute", top: "0px", width: "100%", zIndex: this.z }}>
					<div className="scrollBGContainer">
						<StyledCSSAnimation offset={xoffset + direction * 100} duration={duration} direction={direction}>
							{this.props.children}
						</StyledCSSAnimation>
					</div>
				</div>
			</div>
    	);
	}
}

export default ScrollingBackground;
