import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order {...order} />
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
  orders: PropTypes.arrayOf(PropTypes.shape({
    ingredients: PropTypes.objectOf(PropTypes.number),
    orderData: PropTypes.objectOf(PropTypes.any).isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  onFetchOrders: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: () => dispatch(actions.fetchOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
