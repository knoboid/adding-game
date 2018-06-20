import React, { Component } from 'react';

import Sums from '../sums/sums.js';
import Options from '../options/options.js';
import Clouds from '../clouds/clouds.js';

import './app.css';

function xor(x, y) {
	return x ? !y : y;
}

function addFavicon(image) {
	var link = document.createElement('link');
	link.type = 'image/x-icon';
	link.rel = 'shortcut icon';
	link.href = image;
	document.getElementsByTagName('head')[0].appendChild(link);
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { difficulty: null, gameHasBegun: false };
		this.handleOptionClicked = this.handleOptionClicked.bind(this);
		addFavicon(require('./favicon.ico'));
	}

	/*
	Handle the starting and restarting of the 'game'.
	A new game is started by passing the index of the desired option
		- (gameHasBegun must be false).
	A game is stopped by passing null - (gameHasBegun must be true).

	For a less terse equivalent, see the commented out method
	(which behaves identically).
	*/
	handleOptionClicked(index) {
		// Passing a value of null expresses an intent to stop the current game.
		// Passing an integer (>=0) starts a game 
		const stopGame = (index === null);
		if (xor(this.state.gameHasBegun, !stopGame)) {
			this.setState({
				gameHasBegun: !this.state.gameHasBegun,
				difficulty: index,
			});
		}
	}

	render() {		
		return (
		<div className="app fullHeight">
			<Clouds count={30} />

			<Options
				onClick={this.handleOptionClicked}
				selection={this.state.difficulty}
			/>
			{
				/* Only display the sums if the game has begun */
				this.state.gameHasBegun && 
					<Sums sumCount={10} difficulty={this.state.difficulty} />
			}
		</div>
		);
	}
}

export default App;
