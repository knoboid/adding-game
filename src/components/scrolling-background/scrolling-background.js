import React, { Component } from 'react';
import './scrolling-background.css';

let styleSheet = document.styleSheets[0];

function makeId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function buildAnimation(offset, duration, direction) {
	let animationName = makeId();

	let keyframes =
	`@keyframes ${animationName} {
			0% {transform: translate(${offset}%, ${0}px)}
			100% {transform: translate(${offset + direction * 100}%, ${0}px)}
	}`;

	styleSheet.insertRule(keyframes, 1);

	return {
		animation: `${animationName} ${duration}s infinite linear`,
	};
}

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
    	let duration = props.duration || 60;
		let xoffset = props.xoffset || 0;
		this.yoffset = props.yoffset || 0;
		let direction = props.direction || 1;
    	this.z = props.z || 0;
    	this.style = {}

		this.style.movingBackground
				= buildAnimation(xoffset, duration, direction);
		this.style.offsetMovingBackground1
				= buildAnimation(xoffset - direction * 100, duration, direction);
		this.style.offsetMovingBackground2
				= buildAnimation(xoffset + direction * 100, duration, direction);
		this.state = {};

	}

	render() {
		return (
			<div style={{position: "absolute", top: this.yoffset, width: "100%"}}>
				<div style={{position: "absolute", top: "0px", width: "100%", zIndex: this.z }}>
					<div className="scrollBGContainer">
						<div style={this.style.movingBackground}>
							{this.props.children}
						</div>
					</div>
				</div>
				<div style={{position: "absolute", top: "0px", width: "100%", zIndex: this.z }}>
					<div className="scrollBGContainer">
						<div style={this.style.offsetMovingBackground1}>
							{this.props.children}
						</div>
					</div>
				</div>
				<div style={{position: "absolute", top: "0px", width: "100%", zIndex: this.z }}>
					<div className="scrollBGContainer">
						<div style={this.style.offsetMovingBackground2}>
							{this.props.children}
						</div>
					</div>
				</div>
			</div>

    );
	}
}

export default ScrollingBackground;
