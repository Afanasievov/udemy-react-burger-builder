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
import * as paths from '../../config/paths';

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

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== paths.DEFAULT) {
      this.props.onSetAuthRedirectPath();
    }
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
    let form = (
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
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath(paths.DEFAULT)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
