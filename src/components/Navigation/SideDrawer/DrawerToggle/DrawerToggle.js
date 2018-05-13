import React from 'react';

import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
  <div
    className={classes.DrawerToggle}
    role="button"
    onClick={props.clicked}
    onKeyPress={props.clicked}
    tabIndex={0}
  >
    <div />
    <div />
    <div />
  </div>
);

export default drawerToggle;
