import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControl.css';

const BuildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button className={classes.Less} onClick={props.removed} disabled={props.disabledRemoving}>
      Less
    </button>
    <button className={classes.More} onClick={props.added} disabled={props.disabledAdding}>
      More
    </button>
  </div>
);

BuildControl.propTypes = {
  label: PropTypes.string.isRequired,
  disabledRemoving: PropTypes.bool.isRequired,
  disabledAdding: PropTypes.bool.isRequired,
  removed: PropTypes.func.isRequired,
  added: PropTypes.func.isRequired,
};

export default BuildControl;
