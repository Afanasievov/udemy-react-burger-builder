import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import {
  getFormInput,
  getFormElementsArray,
  checkValidity,
} from '../../utils/forms';
import classes from './Auth.css';

class Auth extends Component {
  state = {
    controls: {
      email: getFormInput({
        type: 'email',
        placeholder: 'Mail Address',
        value: '',
        validation: {
          required: true,
          email: true,
        },
      }),
      password: getFormInput({
        type: 'password',
        placeholder: 'Password',
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
      }),
    },
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  }

  render() {
    const formInputs = getFormElementsArray(this.state.controls, this.inputChangedHandler);
    const form = (
      <form onSubmit={this.orderHandler}>
        {formInputs}
        <Button
          btnType="Success"
          clicked={() => false}
        >
          SUBMIT
        </Button>
      </form>
    );
    return (
      <div className={classes.Auth}>
        {form}
      </div>
    );
  }
}

export default Auth;
