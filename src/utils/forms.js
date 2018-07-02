import React from 'react';

import Input from '@components/UI/Input/Input';
import { EMAIL_REGEX } from '@constants/app';

export const getFormInput = ({
  type,
  placeholder,
  value,
  validation,
  errMsg,
}) => ({
  elementType: 'input',
  elementConfig: {
    type,
    placeholder,
    label: placeholder,
  },
  value,
  validation,
  errMsg,
  isValid: false,
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
  isValid: true,
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
      invalid={!value.isValid}
      shouldValidate={value.validation}
      touched={value.touched}
      changed={changeHandler}
      errMsg={value.errMsg}
    />
  ));

export const checkValidity = ({ value, rules, connectedValue }) => {
  let isValid = true;

  Object.keys(rules).forEach((rule) => {
    switch (rule) {
      case 'required':
        isValid = isValid && value.trim() !== '';
        break;
      case 'email':
        isValid = isValid && EMAIL_REGEX.test(value);
        break;
      case 'minLength':
        isValid = isValid && value.length >= rules.minLength;
        break;
      case 'maxLength':
        isValid = isValid && value.length <= rules.maxLength;
        break;
      case 'equalTo':
        isValid = isValid && value === connectedValue.value && connectedValue.isValid;
        break;
      default:
        isValid = true;
    }
  });

  return isValid;
};

