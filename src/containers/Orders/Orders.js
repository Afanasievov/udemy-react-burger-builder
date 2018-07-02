import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import axios from '@src/axios-orders';
import * as actions from '@actions';
import withErrorHandler from '@hoc/withErrorHandler/withErrorHandler';
import Order from '@components/Order/Order';
import Spinner from '@components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order key={order.id} ings={this.props.ings} {...order} />
      ));
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

Orders.propTypes = {
  ings: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.number,
  })).isRequired,
  orders: PropTypes.arrayOf(PropTypes.shape({
    ingredients: PropTypes.arrayOf(PropTypes.number),
    orderData: PropTypes.objectOf(PropTypes.any).isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  onFetchOrders: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
