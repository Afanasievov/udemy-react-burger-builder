import React from 'react';

import Input from '../components/UI/Input/Input';

export const getFormInput = ({
  type,
  placeholder,
  value,
  validation,
}) => ({
  elementType: 'input',
  elementConfig: {
    type,
    placeholder,
    label: placeholder,
  },
  value,
  validation,
  valid: false,
  touched: false,
});

export const getFormSelect = (options, label) => ({
  elementType: 'select',
  elementConfig: {
    label,
    options: options.map(([value, displayValue]) => ({
      value,
      displayValue,
    })),
  },
  value: options[0][0],
  validation: {},
  valid: true,
});

export const getFormElementsArray = (form, changeHandler) => Object.entries(form)
  .map(([key, value]) => (
    <Input
      key={key}
      id={key}
      label={value.elementConfig.label}
      elementType={value.elementType}
      elementConfig={value.elementConfig}
      value={value.value}
      invalid={!value.valid}
      shouldValidate={value.validation}
      touched={value.touched}
      changed={changeHandler}
    />
  ));

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = regex.test(value) && isValid;
  }

  return isValid;
};

