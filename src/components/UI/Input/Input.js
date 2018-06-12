import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  const changedHandler = event => props.changed(event, props.id);

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={changedHandler}
        />
      );
      break;
    case 'textArea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={changedHandler}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={changedHandler}
        >
          {props.elementConfig.options.map(({ value, displayValue }) => (
            <option
              key={value}
              value={value}
            >
              {displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={changedHandler}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label} htmlFor={props.id}>{props.label}</label>
      {inputElement}
    </div>
  );
};

input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  elementType: PropTypes.string.isRequired,
  elementConfig: PropTypes.shape({
    elementType: PropTypes.string,
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    validation: PropTypes.shape({
      required: PropTypes.bool,
    }),
    value: PropTypes.string,
    options: PropTypes.array,
  }).isRequired,
  value: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  shouldValidate: PropTypes.shape({}).isRequired,
  touched: PropTypes.bool,
  changed: PropTypes.func.isRequired,
};

input.defaultProps = {
  touched: false,
};

export default input;
