import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';

import classes from './Toast.css';
import Aux from '../../../hoc/Auxiliary/Aux';
import Backdrop from '../Backdrop/Backdrop';
import { TOAST_TIMEOUT } from '../../../constants/app';

const animationTiming = {
  enter: 700,
  exit: 700,
};

class Toast extends Component {
  componentDidMount() {
    this.toastTimeout = setTimeout(() => {
      this.props.toastClosed();
    }, this.props.timeout);
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  toastClosedHandler = () => {
    clearTimeout(this.toastTimeout);
    this.props.toastClosed();
  }
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.toastClosedHandler} />
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={this.props.show}
          timeout={animationTiming}
          classNames={{
              enterActive: classes.ToastOpen,
              exitActive: classes.ToastClosed,
          }}
        >
          <div className={classes.Toast} onClick={this.toastClosedHandler}>
            {this.props.children}
          </div>
        </CSSTransition>
      </Aux>
    );
  }
}

Toast.propTypes = {
  show: PropTypes.bool.isRequired,
  toastClosed: PropTypes.func.isRequired,
  timeout: PropTypes.number,
  children: PropTypes.element,
};

Toast.defaultProps = {
  timeout: TOAST_TIMEOUT,
  children: null,
};

export default Toast;
