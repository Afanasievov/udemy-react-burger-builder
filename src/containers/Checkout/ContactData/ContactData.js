import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

const getFormInput = (type, placeholder, value, validation) => ({
  elementType: 'input',
  elementConfig: {
    type,
    placeholder,
  },
  value,
  validation,
  valid: false,
  touched: false,
});

const getFormSelect = options => ({
  elementType: 'select',
  elementConfig: {
    options: options.map(([value, displayValue]) => ({
      value,
      displayValue,
    })),
  },
  value: options[0][0],
  validation: {},
  valid: true,
});

class ContactData extends Component {
  state = {
    orderForm: {
      name: getFormInput(
        'text',
        'Your Name',
        '',
        {
          required: true,
        },
      ),
      street: getFormInput(
        'text',
        'Street',
        '',
        {
          required: true,
        },
      ),
      zipCode: getFormInput(
        'text',
        'ZIP Code',
        '',
        {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
      ),
      country: getFormInput(
        'text',
        'Country',
        '',
        {
          required: true,
        },
      ),
      email: getFormInput(
        'email',
        'Your E-Mail',
        '',
        {
          required: true,
        },
      ),
      deliveryMethod: getFormSelect([
        ['fastest', 'Fastest'],
        ['cheapest', 'Cheapest'],
      ]),
    },
    formIsValid: false,
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    Object.entries(this.state.orderForm).forEach(([key, val]) => {
      formData[key] = val.value;
    });
    // const order = {
    //   ingredients: this.props.ings,
    //   price: this.props.price,
    //   orderData: formData,
    // };
  }

  checkValidity = (value, rules) => {
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

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    const formIsValid = !Object.values(updatedOrderForm)
      .some(({ valid }) => valid !== true);
    this.setState({ orderForm: updatedOrderForm, formIsValid });
  }

  render() {
    const formElementsArray = Object.entries(this.state.orderForm)
      .map(([key, val]) => ({ id: key, config: val }));
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(({ id, config }) => (
          <Input
            key={id}
            id={id}
            label={config.elementConfig.placeholder}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            value={config.value}
            invalid={!config.valid}
            shouldValidate={config.validation}
            touched={config.touched}
            changed={this.inputChangedHandler}
          />
        ))}
        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

// ContactData.propTypes = {
// ings: PropTypes.shape({
//   salad: PropTypes.number.isRequired,
//   bacon: PropTypes.number.isRequired,
//   cheese: PropTypes.number.isRequired,
//   meat: PropTypes.number.isRequired,
// }).isRequired,
// price: PropTypes.string.isRequired,
// };

const mapToState = state => ({
  ings: state.ingredients,
  price: state.totalPrice,
});

export default connect(mapToState)(ContactData);
