import React from 'react';

const drawerToggle = (props) => (
  <div role="button" onClick={props.clicked} onKeyPress={props.clicked} tabIndex={0}>
    MENU
  </div>
);

export default drawerToggle;
