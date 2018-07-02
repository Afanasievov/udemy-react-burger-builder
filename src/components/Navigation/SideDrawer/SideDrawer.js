import React from 'react';
import PropTypes from 'prop-types';

import Logo from '@components/Logo/Logo';
import NavigationItems from '@components/Navigation/NavigationItems/NavigationItems';
import Backdrop from '@components/UI/Backdrop/Backdrop';
import Aux from '@hoc/Auxiliary/Aux';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

sideDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default sideDrawer;
