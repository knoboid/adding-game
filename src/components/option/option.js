import React from 'react';
import Circle from '../circle/circle.js';
import "./option.css";
import { colorKeys } from '../options/options.js';

/*
A simple functional component that displays an option
with a colored circle next to it, fading the option
if it is not in use.
Props:
onClick - callback when the option is clicked.
index - the numerical (integer) index of the option.
selection - the integer of the current selection or  
            null (if no selection has been made).
*/
function Option(props) {
  const i = props.index;
  // Determine whether this option is deselected?
  let deSelected = !(props.selection === null || props.selection === i);
  const item = colorKeys[i];
  const text = Object.keys(item)[0];
  // Tone down items that have been deselected.  
  const color = deSelected ? 'grey' : item[text];
  // Fade the option if it is not the selected option.
  const opacity = deSelected ? 0.2 : 1.0;
  // No need to respond to option clicks when game is in play.
  const onClick = props.selection ? null : ()=>props.onClick(i);

  return (
    <span 
      style={{opacity}}
      className="option" 
      onClick={onClick}
    >
      <Circle size={20} color={color} />
      <span className="option-text">{text}</span>
    </span>
  );
}

export default Option;
