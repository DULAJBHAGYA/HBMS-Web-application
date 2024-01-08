import React from 'react';
import '../Styles/Button.css';

function Button(props) {
  return (
    <button className='Button-one' onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default Button;