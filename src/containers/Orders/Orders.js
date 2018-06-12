import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }

  componentDidMount() {
    axios.get('orders.json')
      .then((res) => {
        const fetchedOrders = Object.entries(res.data)
          .map(([key, value]) => ({ ...value, id: key }));

        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        console.log('Fetch orders err: ', err);
        this.setState({ loading: false });
      });
  }

  render() {
    let orders = <Spinner />;
    if (!this.state.loading) {
      orders = this.state.orders.map(order => (
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

export default withErrorHandler(Orders, axios);
