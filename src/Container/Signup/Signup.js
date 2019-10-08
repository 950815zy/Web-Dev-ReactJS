import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Spinner from '../../Components/Spinner/Spinner';
import classes from './Signup.css';
import logo from './logo.png';
import { Redirect } from 'react-router-dom';

class Signup extends Component {
    state = {
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'username',
                    placeholder: 'username'
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
                    placeholder: 'password'
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
        redirect: false
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
            isValid = value.lengh >= rules.minLength && isValid;
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
        const signupData = {
            username : this.state.controls.username.value,
            password : this.state.controls.password.value
        };
        let url = '/register';
        axios
        .post(url, signupData)
        .then(response => {
            this.setState({
                redirect: true
            });
        })
        .catch(err => {
            this.setState({
                errorMessage: err.message,
                redirect: false
            });
        });
    };

    render() {
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
      <div className={classes.signup}>
        {/* {successMessage} */}
        {errorMessage}
        {authRedirect}
        <img className={classes.logo} src={logo} width="20%" height="15%"/>
        <p >Build Product Selection Platform</p>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">
            Register
          </Button>
        </form>
      </div>
      </html>
    );
  }
}

export default Signup;