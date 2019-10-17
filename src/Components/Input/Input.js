import React from 'react';
import {FaUserAlt} from "react-icons/fa";
import {FaLock} from "react-icons/fa";
import './Input.css';
// import { View } from "react-native";
const input = props => {
  let inputElement = null;
  const inputClasses = ['InputElement'];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push('Invalid');
  }

  switch (props.elementConfig.placeholder) {
    case 'Username or Email':
      inputElement = (
        <div style={{display:"flex"}}>
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
        <FaUserAlt  style={{marginTop: "1em",color:"grey"}}/>
        </div>
      );
      break;
      case 'Password':
      case 'Confirmed Password':
        inputElement = (
          <div style={{display:"flex"}}>
          <input
            type="password"
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
          <FaLock style={{color:"grey",marginTop: "1em"}}/>
          </div>
        );
        break;
    default:
      inputElement = (
        <div >
        <input 
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
        
        </div>
      );
  }

  return (
    <div>
      {inputElement}
    </div>
  );
};

export default input;
