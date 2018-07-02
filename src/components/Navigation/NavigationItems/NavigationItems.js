import React from 'react';
import PropTypes from 'prop-types';

import * as PATHS from '@constants/paths';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link={PATHS.DEFAULT} exact>Burger Builder</NavigationItem>
    {props.isAuthenticated && <NavigationItem link={PATHS.ORDERS} >Orders</NavigationItem>}
    {props.isAuthenticated
      ? <NavigationItem link={PATHS.LOGOUT}>Logout</NavigationItem>
      : <NavigationItem link={PATHS.AUTH} >Authenticate</NavigationItem>
    }
  </ul>
);

navigationItems.propTypes = {
  isAuthenticated: PropTypes.bool,
};

navigationItems.defaultProps = {
  isAuthenticated: false,
};

export default navigationItems;
