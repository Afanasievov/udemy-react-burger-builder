import React from 'react';
import PropTypes from 'prop-types';

import Logo from '@components/Logo/Logo';
import NavigationItems from '@components/Navigation/NavigationItems/NavigationItems';
import DrawerToggle from '@components/Navigation/SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.css';

const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

toolbar.propTypes = {
  drawerToggleClicked: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default toolbar;
