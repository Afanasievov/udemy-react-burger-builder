import React, { Component } from 'react';
import queryString from 'query-string';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  }

  componentWillMount() {
    const queryParams = queryString.parse(this.props.location.search);
    const { totalPrice } = queryParams;
    const ingredients = {};
    Object.entries(queryParams)
      .filter(([key]) => key !== 'totalPrice')
      .forEach(([key, value]) => {
        ingredients[key] = +value;
      });
    this.setState({ ingredients, totalPrice });
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
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={
            (props) => (
              <ContactData
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                {...props}
              />
            )
          }
        />
      </div>
    );
  }
}

export default Checkout;
