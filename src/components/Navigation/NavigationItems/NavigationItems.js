import React from 'react';
import PropTypes from 'prop-types';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    <NavigationItem link="/orders" >Orders</NavigationItem>
    {props.isAuthenticated
      ? <NavigationItem link="/logout">Logout</NavigationItem>
      : <NavigationItem link="/auth" >Authenticate</NavigationItem>
    }
  </ul>
);

navigationItems.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default navigationItems;
