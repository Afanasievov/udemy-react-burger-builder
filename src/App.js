import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

const app = () => (
  <Layout>
    <Switch>
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/auth" component={Auth} />
      <Route path="/logout" component={Logout} />
      <Route path="/" component={BurgerBuilder} />
    </Switch>
  </Layout>
);

export default app;
