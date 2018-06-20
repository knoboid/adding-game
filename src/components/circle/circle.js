import React from 'react';

/*
  Draws an svg circle.
  Props:
  - size
  - color
*/
function Circle(props) {
  return (
    <svg height={props.size} width={props.size}>
      <circle
        cx={props.size/2}
        cy={props.size/2}
        r={props.size/2}
        fill={props.color}
      />
    </svg>
  );
}

export default Circle;
