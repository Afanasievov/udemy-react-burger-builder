import React, { Component } from 'react';
import queryString from 'query-string';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
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
      </div>
    );
  }
}

export default Checkout;
