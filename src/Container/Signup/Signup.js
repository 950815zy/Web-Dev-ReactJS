import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Spinner from '../../Components/Spinner/Spinner';
import classes from './Signup.module.css';
import logo from '../Auth/logo.png';
import { Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Signup extends Component {
    state = {
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'username',
                    placeholder: 'Username or Email'
                },
                value:'',
                validation: {
                    required: true,
                    isUsername: true
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
            confirmedpassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirmed Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        errorMessage: '',
        successMessage: '',
        redirect: false,
        errorMes: false
    };

    checkValidation(value, rules) {
        let isValid = true;
        if(!rules) {
            return true;
        }
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidation(
                    event.target.value,
                    this.state.controls[controlName].validation
                ),
                touched: true
            }
        };

        let formIsValid = true;
        for(let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        this.setState({controls:updatedControls, formIsValid: formIsValid});
    };

    submitHandler = event => {
        event.preventDefault();
        const signupData = {
            username : this.state.controls.username.value,
            password : this.state.controls.password.value
        };

        const  password = this.state.controls.password.value
        const  confirmedpassword = this.state.controls.confirmedpassword.value
        if (password == confirmedpassword) {
            let url = '/register';
            axios
            .post(url, signupData)
            this.props.history.push("/auth")
        };

        if(this.state.controls.username.value != this.state.controls.confirmedpassword.value) {
            this.setState({errorMes:true})
        }
    }    

    swithLogIn =() => {
        this.setState({redirect:true})
    }

    render() {
        if(this.state.redirect){
            return (<Redirect push to="/auth" />)
        }
        let formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id:key,
                config: this.state.controls[key]
            });
        }
        let form = formElementArray.map(formElement => (
            <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
        />
        ));

        let errorMessage = null;
        if(this.state.errorMessage) {
            errorMessage = (
                <div
                className="alert alert-danger"
                role="alert"
                style={{ textAlign: 'center' }}
              >
                <span>{this.state.errorMessage}</span>
              </div>
            );
        }
        let authRedirect = null;
        if (this.state.redirect) {
        authRedirect = <Redirect to="/" />;
        }

    return (
        <html style={{backgroundImage:"linear-gradient(#7bb7f8ee, #ffffff)"}}>
        <div className={classes.Auth}>
        <span style={{float: "right", border:"0px",marginRight: "20%", paddingTop:"5%",fontSize:"16px", fontWeight:"bolder", color: "rgb(95 93 93)"}}
                onClick={this.swithLogIn}
                btnType="Danger">Back to Log In</span>
            {errorMessage}
            <img className={classes.logo} src={logo} width="25%" height="18%"/>
            <p style={{fontSize:"18px"}}>Build Product Selection Platform</p>
            <form onSubmit={this.submitHandler}>
                {form}
                    <button style={{ fontSize:"13px", float: "right",borderRadius:"5px",color:"white",fontWeight:"bold", padding:"5px 20px 5px 20px",backgroundColor: "rgb(38, 86, 156)", marginRight: "27%"}} btnType="Success">Register</button>                     
            </form> <br/>
            {this.state.errorMes ? <span style={{fontSize:"14px",marginLeft:"30%",color:"red"}}>Invalid username or password</span> : null}

        </div>
        </html>

    );
  }
}

export default withRouter(Signup);