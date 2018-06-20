import React, { Component } from 'react';

import IsCorrect from '../is-correct/is-correct.js';

import './sum.css';
/*
Props:
index - the index of this sum. Acts as a unique identifier.
difficulty - see Sums class.
onAnswer - Callback for submitting answer results
gameOver - Boolean denoting whether the current game has ended.
*/
class Sum extends Component {
	constructor(props) {
		super(props);
		this.state = {isCorrect: null};

		this.a = Math.floor(Math.random() * ((props.difficulty+1) * 5) + 1);
		this.b = Math.floor(Math.random() * ((props.difficulty+1) * 5) + 1);
	
		this.correctAnswer = parseInt(this.a, 10) + parseInt(this.b, 10);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.rowClick = this.rowClick.bind(this);
		this.moveTo = 0;
	}
	
	focus() {
		this.input.focus();
	}

	// Called when an answer needs to be evaluated.
	handleAnswer(answer) {
		// Evaluate whether the answer is correct.
		const isCorrect = answer === this.correctAnswer;
		// Set the state variable which indicates whether the answer is correct.
		this.setState({
			isCorrect
		});
		// Pass data back to the parent component.
		this.props.onAnswer(this.props.index, isCorrect, this.moveTo);
	}

	moveCursor() {
		this.setState({
			isCorrect: null,
		});
		this.props.onAnswer(this.props.index, null, this.moveTo);
		this.moveTo = 0;
	}

	handleBlur(e) {		
		let inputAnswer = parseInt(e.target.value, 10);
		if (!isNaN(inputAnswer)) {
			this.handleAnswer(inputAnswer);
		}
	}

	rowClick(e) {
		this.focus();
	}

	handleKeyDown(e) {
		this.moveTo = 0;
		// Define how presses effect the subsequent movement of the cursor.
		if (e.key === "Enter" || e.key === "Tab" || e.key === "ArrowDown") {
			this.moveTo = +1;
		}
		else if (e.key === "ArrowUp") {
			this.moveTo = -1;
		}
		else if (e.key === "Escape") {
			e.target.value = '';
		}
		
		// If the cursor is about to move...
		if (this.moveTo !== 0) {
			// The below is necessary. For instance, the default behaviour
			// of the up and down arrows is to increase and decrease
			// the value of the numerical input element.
			e.preventDefault();

			let inputAnswer = parseInt(e.target.value, 10);
			if (isNaN(inputAnswer)) {
				// If the entry isn't a number just delete the
				// contents and 
				e.target.value = '';
				this.moveCursor()
			}
			else {
				e.target.value = inputAnswer;
				this.handleAnswer(inputAnswer);
			}
		}
	}

	render() {
		return (
			<tr onClick={this.rowClick}>
				<td className="center">{this.a}</td>
				<td>+</td>
				<td className="center"> {this.b}</td>
				<td> = </td>
				<td>
					<input
						className="input"
						onKeyDown={this.handleKeyDown}
						onBlur={this.handleBlur}
						type="number"
						style={{width:'2em'}}
						ref={(input)=>this.input=input}
						disabled={this.props.gameOver}
					/>
				</td>
				<td>
					<IsCorrect correct={this.state.isCorrect} duration={.25} size={0.8} />
				</td>

			</tr>
		);
	}
}

export default Sum;
