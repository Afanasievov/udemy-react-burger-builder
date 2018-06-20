import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import * as paths from './config/paths';

const app = () => (
  <Layout>
    <Switch>
      <Route path={paths.CHECKOUT} component={Checkout} />
      <Route path={paths.ORDERS} component={Orders} />
      <Route path={paths.AUTH} component={Auth} />
      <Route path={paths.LOGOUT} component={Logout} />
      <Route path={paths.DEFAULT} component={BurgerBuilder} />
    </Switch>
  </Layout>
);

export default app;
