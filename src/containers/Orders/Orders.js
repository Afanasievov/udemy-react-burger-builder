import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    // orders: [],
    // loading: true,
  }

  componentDidMount() {
    axios.get('orders.json')
      .then((res) => {
        console.log('res: ', res);
        // const fetchedOrders = Object.entries(res.data)
        //   .map(([key, value]) => ({ ...value, id: key }));

        // this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        console.log('err: ', err);
        // this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
