import React, { Component } from 'react';
import Option from '../option/option.js';

import './options.scss';
const restart = require('./img/restart.png');

export const colorKeys = [
	{'Easy': '#87FF0F'},
	{'Medium': '#FFE70F'},
	{'Hard': 'red'},
];

/*
Options selection.
Props:
onClick: callback provided by parent that controls stopping and starting game.
selection: index of the current selected option. null if no selection.
*/
class Options extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
    this.handleOptionClicked = this.handleOptionClicked.bind(this);
    this.handleRestartClicked = this.handleRestartClicked.bind(this);
  }

  handleRestartClicked() {
    this.props.onClick(null); 
  }

	handleOptionClicked(index) {    
    this.props.onClick(index);
	}

  render() {
    return (
			<span id="options">
        <span className='optionsSpacer' />
          <span className='optionsContainer topLayer'>
            <Option
              onClick={this.handleOptionClicked}
              index={0}
              selection={this.props.selection}
            />
            <Option
              onClick={this.handleOptionClicked}
              index={1}
              selection={this.props.selection}
            />
            <Option
              onClick={this.handleOptionClicked}
              index={2}
              selection={this.props.selection}
            />
            <img 
              onClick={this.handleRestartClicked} 
              className='optionsRestart'
              src={restart}/>
          </span>
        <span  
          className='optionsSpacer'
        />

			</span>
    );
  }
}

export default Options;
