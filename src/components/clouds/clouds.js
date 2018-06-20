import React, { Component } from 'react';
import Cloud from '../cloud/cloud.js';

const base = 7; // proportion of small clouds to large clouds.
const min = 0.2; // size of smallest cloud
const power = 3; // size of the largest cloud relative to smallest cloud.
const max = Math.pow(base, power);

/*
Draws a collection of scrolling clouds.
Props:
count: the number of clouds to be drawn.
*/
class Clouds extends Component {
  constructor(props) {
    super(props);
    this.clouds = [];

    for(let i =0; i<props.count; i++) {

      let parameter = Math.random() * (max-1) + 1;
      let size = (power + min) - Math.log(parameter)/Math.log(base);

      let speed = size;
      let x = Math.random() * 100;
      let y = Math.random() * 200;
      let z = Math.floor((max-parameter)*100);
      this.clouds.push(
        <Cloud key={i} size={size} speed={speed} x={x} y={y} z={z} d={-1} />
      );
    }
  }

  render() {
    return (
      <div>
        {this.clouds.map((cloud)=>cloud)}
      </div>
    );
  }

}

export default Clouds;
