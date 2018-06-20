import React from 'react';
import PropTypes from 'prop-types';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import * as paths from '../../../config/paths';

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link={paths.DEFAULT} exact>Burger Builder</NavigationItem>
    {props.isAuthenticated && <NavigationItem link={paths.ORDERS} >Orders</NavigationItem>}
    {props.isAuthenticated
      ? <NavigationItem link={paths.LOGOUT}>Logout</NavigationItem>
      : <NavigationItem link={paths.AUTH} >Authenticate</NavigationItem>
    }
  </ul>
);

navigationItems.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default navigationItems;
