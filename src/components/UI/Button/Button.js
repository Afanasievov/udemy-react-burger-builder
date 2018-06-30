import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.css';

const button = props => (
  <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

button.propTypes = {
  btnType: PropTypes.string.isRequired,
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

button.defaultProps = {
  disabled: false,
  clicked: null,
};

export default button;
