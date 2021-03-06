import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/index';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Spinner from '../../Components/Spinner/Spinner';
import classes from './Auth.module.css';
import logo from './logo.png';
import { Link, Redirect } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";

import { IoIosReturnRight } from 'react-icons/io';

class Auth extends Component {
    state = {
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'username',
                    placeholder: 'Username or Email'
                },
                value: '',
                validation: {
                    required: true,
                    isUsername : true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true,
        directToSignup : false
        
    }

    checkValidity(value, rules) {
        let isValid = true;
        if( !rules ) {
            return true;
        }
        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isUsername ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }
        return isValid;
    }   

    inputChangedHandler = ( event, controlName ) => {
        // console.log(...this.state.controls);
          const updatedControls = {
              ...this.state.controls,
              [controlName]: {
                  ...this.state.controls[controlName],
                  value: event.target.value,
                  valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                  touched: true
              }
          };
          this.setState( { controls: updatedControls } );
    }   

    submitHandler = ( event ) => {
        event.preventDefault();
        
        this.props.onAuth( this.state.controls.username.value, this.state.controls.password.value, this.state.isSignup );
    }

    // switchAuthModeHandler = () => {
    //     this.setState(prevState => {
    //         return {isSignup: !prevState.isSignup};
    //     });
    // }

    swithSignup = () => {
        this.setState({directToSignup: true})
    }


    render () {
        if (this.state.directToSignup) {
            return (<Redirect push to="/signup" />)
        }
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <html style={{backgroundImage:"linear-gradient(#7bb7f8ee, #ffffff)"}}>
            <div className={classes.Auth}>
            <span style={{float: "right", border:"0px",marginRight: "20%", paddingTop:"5%",fontSize:"16px", fontWeight:"bolder", color: "rgb(95 93 93)"}}
                onClick={this.swithSignup}
                btnType="Danger">Sign up</span>
                {authRedirect}
                {errorMessage}
                <img className={classes.logo} src={logo} width="25%" height="18%"/>
                <p style={{fontSize:"18px"}}>Build Product Selection Platform</p>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <div>
                        <button style={{ fontSize:"11px", float: "right",borderRadius:"5px",color:"white",fontWeight:"bold", padding:"5px 20px 5px 20px",backgroundColor: "rgb(38, 86, 156)", marginRight: "27%"}} btnType="Success">{this.state.isSignup ? 'Submit' : 'Log in'}</button>                     
                    </div>               
                </form> <br/>
            </div>
            </html>
        );
    }

}

const mapStateToProps = state => {
    return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.token !== null,
      authRedirectPath: state.auth.authRedirectPath
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onAuth: (username, password, isSignup) =>
        dispatch(actions.auth(username, password, isSignup)),
      onSetAuthRedirectPath: () =>
        dispatch(actions.setAuthRedirectPath('/search'))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Auth);
