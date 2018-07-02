import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';

import Aux from '@hoc/Auxiliary/Aux';
import Backdrop from '@components/UI/Backdrop/Backdrop';
import classes from './Modal.css';

const animationTiming = {
  enter: 700,
  exit: 700,
};

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={this.props.show}
          timeout={animationTiming}
          classNames={{
              enterActive: classes.ModalOpen,
              exitActive: classes.ModalClosed,
          }}
        >
          <div className={classes.Modal}>
            {this.props.children}
          </div>
        </CSSTransition>
      </Aux>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.func.isRequired,
  children: PropTypes.element,
};

Modal.defaultProps = {
  children: null,
};

export default Modal;
