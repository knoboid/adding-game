import React, { Component } from 'react';

import Sum from '../sum/sum.js';
import SumsStatus from '../sums-status/sums-status.js';

import './sums.scss';

/*
Props:
sumCount:	The number of sums.
difficulty:	The difficulty. An interger: 0 (easy), 1 or 2 (hard).
*/
class Sums extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focus: 0,
			answeredCount: 0,
			correctCount: 0,
			width: null,
			timer: 0,
			gameOver: false,
		};
		// this.sums = [];
		this.sumRefs = [];
		this.handleAnswered = this.handleAnswered.bind(this);
		for(let i =0; i<props.sumCount; i++) {
			this.sumRefs.push(React.createRef());
		}
		this.answers = new Array(props.sumCount).fill(null);
	}

	componentDidMount() {
		this.focusOnSum(this.state.focus);
		/*
		(One time only) get the width of the table so that we
		can make the status element line up with it.
		Use flex?
		*/
		if (!this.state.width) {
			this.setState({width: this.table.offsetWidth * .707})
		}
	}

	// Moves focus (if possible) to a sum by index.
	focusOnSum(i) {
		if (i >= 0 && i < this.props.sumCount) {			
			this.sumRefs[i].current.focus();
		}
	}

	// Deals with newly submitted answers. 
	handleAnswered(index, isCorrect, moveCursorTo) {
		this.answers[index] = isCorrect;
		let answeredCount = 0;
		let correctCount = 0;

		// Count the number of questions that have been answered
		// and the number of correct answers.
		for (var i = 0; i < this.answers.length; i++) {
			const answer = this.answers[i];
			if (answer !== null) {
				answeredCount++;
				if (answer) {
					correctCount++;
				}
			} 
		}
		this.setState({answeredCount, correctCount});
		if (correctCount == this.props.sumCount) {
			clearInterval(this.timer);
			this.setState({gameOver: true});
		}

		// Where should cursor focus go next?
		// Determine whether the suggested option is out of bounds.
		if (moveCursorTo !== 0) {
			let focusNext = index + moveCursorTo;
			if (focusNext >=0 && focusNext < this.props.sumCount) {
				this.setState({
					focus: focusNext,
				});
				this.focusOnSum(focusNext);
			}
		}
	}

	render() {		
		return (
			<div className="sumsContainer topLayer">
				<table ref={(table) => this.table=table} className="sumsTable">
					<tbody>
						{this.sumRefs.map((sumRef, i)=>{		
							return (
								<Sum
									key={i}
									index={i}
									ref={sumRef}
									difficulty={this.props.difficulty}
									onAnswer={this.handleAnswered}
									gameOver={this.state.gameOver}
								/>
							);
						})}
					</tbody>
				</table>

				<div className='sumsSpacer' />
				
				{
					this.state.width === 0 ? '' :
					(
						<SumsStatus 
							width={this.state.width}
							answeredCount={this.state.answeredCount}
							correctCount={this.state.correctCount}
							gameOver={this.state.gameOver}
						/>
					) 
				}
			</div>
		);
	}
}

export default Sums;
