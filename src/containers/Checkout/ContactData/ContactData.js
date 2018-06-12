import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';

const getFormInput = (type, placeholder, value, validation) => ({
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

const getFormSelect = (options, label) => ({
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
      ], 'Delivery Method'),
    },
    formIsValid: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    Object.entries(this.state.orderForm).forEach(([key, val]) => {
      formData[key] = val.value;
    });
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };

    this.props.onOrderBurger(order);
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
            label={config.elementConfig.label}
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

    if (this.props.loading) {
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

ContactData.propTypes = {
  ings: PropTypes.objectOf(PropTypes.number).isRequired,
  price: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  onOrderBurger: PropTypes.func.isRequired,
};

ContactData.defaultProps = {
  loading: false,
};

const mapToState = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: orderData => dispatch(actions.purchaseBurger(orderData)),
});

export default connect(mapToState, mapDispatchToProps)(withErrorHandler(ContactData, axios));
