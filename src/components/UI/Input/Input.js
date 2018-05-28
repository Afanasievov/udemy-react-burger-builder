import React from 'react';

import classes from './Input.css';

const input = (props) => {
  let inputElement = null;

  const changedHandler = (event) => props.changed(event, props.id);

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={changedHandler}
        />
      );
      break;
    case 'textArea':
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={changedHandler}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={classes.InputElement}
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
          className={classes.InputElement}
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

export default input;
