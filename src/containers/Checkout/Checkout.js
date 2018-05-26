import React, { Component } from 'react';
import queryString from 'query-string';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0,
    },
  };

  componentDidMount() {
    const ingredients = queryString.parse(this.props.location.search, { decode: true });
    Object.entries(ingredients).forEach(([key, value]) => {
      ingredients[key] = +value;
    });
    // eslint-disable-next-line
    this.setState({ ingredients });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
      </div>
    );
  }
}

export default Checkout;
