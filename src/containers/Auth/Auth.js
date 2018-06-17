import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../../components/UI/Button/Button';
import {
  getFormInput,
  getFormElementsArray,
  checkValidity,
} from '../../utils/forms';
import classes from './Auth.css';
import * as actions from '../../store/actions';

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
    isSignIn: true,
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

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignIn,
    );
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => ({
      isSignIn: !prevState.isSignIn,
    }));
  }

  render() {
    const formInputs = getFormElementsArray(this.state.controls, this.inputChangedHandler);
    const form = (
      <form onSubmit={this.submitHandler}>
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
        <Button
          btnType="Danger"
          clicked={this.switchAuthModeHandler}
        >
          SWITCH TO {this.state.isSignIn ? 'SIGNUP' : 'SIGNIN'}
        </Button>
      </div>
    );
  }
}

Auth.propTypes = {
  onAuth: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignIn) => dispatch(actions.auth(email, password, isSignIn)),
});

export default connect(null, mapDispatchToProps)(Auth);
