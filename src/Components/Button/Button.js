import React from 'react';

import classes from './Button.css';

const button = props => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    style={{
      float: 'right',
      backgroundColor: '#317499',
      color: 'white',
      padding: '4px 15px',
      border: 'none',
      marginTop: '5px'
    }}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;