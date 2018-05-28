import React, { Component } from 'react';

import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

const getFormInput = (type, placeholder, value) => ({
  elementType: 'input',
  elementConfig: {
    type,
    placeholder,
  },
  value,
});

const getFormSelect = (options) => ({
  elementType: 'select',
  elementConfig: {
    options: options.map(([value, displayValue]) => ({
      value,
      displayValue,
    })),
  },
});

class ContactData extends Component {
  state = {
    orderForm: {
      name: getFormInput('text', 'Your Name', ''),
      street: getFormInput('text', 'Street', ''),
      zipCode: getFormInput('text', 'ZIP Code', ''),
      country: getFormInput('text', 'Country', ''),
      email: getFormInput('email', 'Your E-Mail', ''),
      deliveryMethod: getFormSelect([
        ['fastest', 'Fastest'],
        ['cheapest', 'Cheapest'],
      ]),
    },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    Object.entries(this.state.orderForm).forEach(([key, val]) => {
      formData[key] = val.value;
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };

    axios
      .post('/orders.json', order)
      .then(() => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
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
            changed={this.inputChangedHandler}
          />
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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

export default ContactData;
