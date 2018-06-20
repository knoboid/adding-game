import React from 'react';
import ScrollingBackground from '../scrolling-background/scrolling-background.js';
import cloud from './img/cloud.png';

/*
Draws a horizontal scrolling cloud.
Props:
size: size of the cloud measured in 100px units.
speed: if 1, the cloud will traverse the screen in 60 seconds.
       if 2: 30 seconds. etc...
x: initial horizontal offset.
y: vertical offset.
z: z-index.
d: direction component. -1 reverses the direction. +1: forward.
*/
function Cloud(props) {
  let size = props.size * 100;
  return (
    <ScrollingBackground
      duration={60/props.speed}
      xoffset={props.x}
      yoffset={props.y+"px"}
      z={props.z}
      direction={props.d}>
      <img
        style={{
          top: -size/2+"px",
          width: size+"px",
          height: size+"px",
        }}
        className="cloud"
        src={cloud}
      />
    </ScrollingBackground>
  );
}

export default Cloud;