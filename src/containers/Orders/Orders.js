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
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order key={order.id} {...order} />
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
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: token => dispatch(actions.fetchOrders(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
