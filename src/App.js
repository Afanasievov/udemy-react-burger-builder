import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import { BurgerBuilder } from './containers/BurgerBuilder/BurgerBuilder';
import * as PATHS from './constants/paths';
import * as actions from './store/actions';

const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path={PATHS.AUTH} component={asyncAuth} />
        <Route path={PATHS.DEFAULT} exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path={PATHS.CHECKOUT} component={asyncCheckout} />
          <Route path={PATHS.ORDERS} component={asyncOrders} />
          <Route path={PATHS.LOGOUT} component={Logout} />
          <Route path={PATHS.AUTH} component={asyncAuth} />
          <Route path={PATHS.DEFAULT} exact component={BurgerBuilder} />
          <Redirect to={PATHS.DEFAULT} />
        </Switch>
      );
    }
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

App.propTypes = {
  onTryAutoSignup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
