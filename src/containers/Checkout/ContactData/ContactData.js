import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';
import {
  getFormInput,
  getFormSelect,
  getFormElementsArray,
  checkValidity,
} from '../../../utils/forms';
import { updateObject } from '../../../utils/objects';

class ContactData extends Component {
  state = {
    orderForm: {
      name: getFormInput({
        type: 'text',
        placeholder: 'Your Name',
        value: '',
        validation: {
          required: true,
        },
      }),
      street: getFormInput({
        type: 'text',
        placeholder: 'Street',
        value: '',
        validation: {
          required: true,
        },
      }),
      zipCode: getFormInput({
        type: 'text',
        placeholder: 'ZIP Code',
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
      }),
      country: getFormInput({
        type: 'text',
        placeholder: 'Country',
        value: '',
        validation: {
          required: true,
        },
      }),
      email: getFormInput({
        type: 'email',
        placeholder: 'Your E-Mail',
        value: '',
        validation: {
          required: true,
          email: true,
        },
      }),
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
      ingredients: this.props.orderIngredients.map(({ ingredientId }) => ingredientId),
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onOrderBurger(order, this.props.token);
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const { value } = event.target;
    const updatedFormElement = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        value,
        isValid: checkValidity({
          value,
          rules: this.state.orderForm[inputIdentifier].validation,
        }),
        touched: true,
      },
    );
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement,
    });
    const formIsValid = !Object.values(updatedOrderForm)
      .some(({ isValid }) => isValid !== true);
    this.setState({ orderForm: updatedOrderForm, formIsValid });
  }

  render() {
    const formInputs = getFormElementsArray(this.state.orderForm, this.inputChangedHandler);
    let form = (
      <form onSubmit={this.orderHandler}>
        {formInputs}
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
  orderIngredients: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    ingredientId: PropTypes.number,
  })).isRequired,
  price: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  onOrderBurger: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

ContactData.defaultProps = {
  loading: false,
};

const mapStateToProps = state => ({
  orderIngredients: state.burgerBuilder.orderIngredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
