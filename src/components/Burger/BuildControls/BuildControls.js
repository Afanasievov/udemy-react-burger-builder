import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {Object.keys(props.ingredients).map(key => (
      <BuildControl
        key={key}
        label={key}
        added={() => props.ingredientAdded(key)}
        removed={() => props.ingredientRemoved(key)}
        disabled={props.disabled[key]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      {props.isAuth ? 'ORDER NOW' : 'SIGN IN TO ORDER'}
    </button>
  </div>
);

buildControls.propTypes = {
  ingredients: PropTypes.objectOf(PropTypes.number).isRequired,
  price: PropTypes.number.isRequired,
  disabled: PropTypes.objectOf(PropTypes.bool).isRequired,
  purchasable: PropTypes.bool.isRequired,
  ordered: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default buildControls;
