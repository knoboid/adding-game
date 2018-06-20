import React, { Component } from 'react';

import './sums-status.scss';

/*
Display a panel showing details about the current game.
Props:
width = How wide the component should be.
answeredCount = How many questions have been answered.
correctCount = How many questions have been answered correctly.
gameOver = Boolean denoting whether the game has ended.
*/
class SumsStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {timer: 0};
        // Start the game timer.
		this.timer = setInterval(() => {
			this.setState({timer: this.state.timer + 0.1})
		}, 100);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

	formatPercentage() {
		const answered = this.props.answeredCount;
		const correct = this.props.correctCount;
		if (answered===0) {
			// Avoid division by zero. 
			return "-";
		}
		else {
			return (100*correct/answered).toFixed(1) + '%';
		}
	}

	formatTimer() {
		return (Math.round(this.state.timer*10)/10).toFixed(1);
	}

    render() {
        // Stop the timer if the game has ended.
        if (this.timer && this.props.gameOver) {
            clearInterval(this.timer);
            this.timer = null;
        }
        return (
            <div style={{width: this.props.width}} className='sumsStatus topLayer'>
                <div>Answered: {this.props.answeredCount}</div>
                <div>Correct: {this.props.correctCount}</div>
                <div>{this.formatPercentage()}</div>
                <div>Timer: {this.formatTimer()}</div>
            </div>
        );
    }
}

export default SumsStatus;
