import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import {
  getFormInput,
  getFormElementsArray,
  checkValidity,
} from '../../utils/forms';
import classes from './Auth.css';
import * as actions from '../../store/actions';
import * as PATHS from '../../constants/paths';
import { updateObject } from '../../utils/objects';

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
      confirmPassword: getFormInput({
        type: 'password',
        placeholder: 'Confirm Password',
        value: '',
        validation: {
          equalTo: 'password',
        },
      }),
    },
    isSignIn: true,
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== PATHS.DEFAULT) {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const { value } = event.target;
    let connectedValue;
    if (this.state.controls[controlName].validation.equalTo) {
      connectedValue = {
        value: this.state.controls[this.state.controls[controlName].validation.equalTo].value,
        isValid: this.state.controls[this.state.controls[controlName].validation.equalTo].isValid,
      };
    }
    if (controlName === 'password') {
      connectedValue = {
        value,
        isValid: checkValidity({
          value,
          rules: this.state.controls[controlName].validation,
        }),
      };
    }

    this.setState((prevState) => {
      let updatedControls = updateObject(this.state.controls, {
        [controlName]: updateObject(this.state.controls[controlName], {
          value,
          isValid: checkValidity({
            value,
            rules: this.state.controls[controlName].validation,
            connectedValue,
          }),
          touched: true,
        }),
      });

      if (controlName === 'password' && this.state.controls.confirmPassword.touched) {
        updatedControls = updateObject(updatedControls, {
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            isValid: checkValidity({
              value: prevState.controls.confirmPassword.value,
              rules: prevState.controls.confirmPassword.validation,
              connectedValue,
            }),
          },
        });
      }

      return { controls: updatedControls };
    });
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
    const controls = {
      email: this.state.controls.email,
      password: this.state.controls.password,
    };
    if (!this.state.isSignIn) {
      controls.confirmPassword = this.state.controls.confirmPassword;
    }
    const formInputs = getFormElementsArray(controls, this.inputChangedHandler);
    const isSubmitDisabled = Object.values(controls).some(({ isValid }) => isValid !== true);
    let form = (
      <form onSubmit={this.submitHandler}>
        {formInputs}
        <Button
          btnType="Success"
          disabled={isSubmitDisabled}
        >
          SUBMIT
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    const errorMessage = this.props.error && this.props.error.message;

    const mode = `SWITCH TO ${this.state.isSignIn ? 'SIGNUP' : 'SIGNIN'}`;

    const authRedirect = this.props.isAuthenticated
      ? <Redirect to={this.props.authRedirectPath} />
      : null;

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {form}
        <Button
          btnType="Danger"
          clicked={this.switchAuthModeHandler}
        >
          {mode}
        </Button>
      </div>
    );
  }
}

Auth.propTypes = {
  onAuth: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape({ message: PropTypes.string }),
  isAuthenticated: PropTypes.bool.isRequired,
  buildingBurger: PropTypes.bool.isRequired,
  authRedirectPath: PropTypes.string.isRequired,
  onSetAuthRedirectPath: PropTypes.func.isRequired,
};

Auth.defaultProps = {
  error: null,
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignIn) => dispatch(actions.auth(email, password, isSignIn)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath(PATHS.DEFAULT)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
