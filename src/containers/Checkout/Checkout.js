import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as PATHS from '../../constants/paths';

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    let summary = <Redirect to={PATHS.DEFAULT} />;
    if (this.props.orderIngredients.length) {
      const purchasedRedirect = this.props.purchased ? <Redirect to={PATHS.DEFAULT} /> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ings={this.props.ings}
            orderIngredients={this.props.orderIngredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={`${this.props.match.path}/contact-data`}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

Checkout.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  ings: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.number,
  })).isRequired,
  orderIngredients: PropTypes.arrayOf(PropTypes.number).isRequired,
  purchased: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  orderIngredients: state.burgerBuilder.orderIngredients,
  purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);
