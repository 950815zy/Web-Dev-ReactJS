import React from 'react';

import './Input.css';

const input = props => {
  let inputElement = null;
  const inputClasses = ['InputElement'];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push('Invalid');
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputElement = (
        // <i className="fas fa-lock fa-lg input-logo" />
        // <i className="fas fa-user fa-lg input-logo" />
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div style={{}}>
      {/*  style={{ height: '10%' }} */}
      {/* <label>{props.label}</label> */}
      {inputElement}
    </div>
  );
};

export default input;
