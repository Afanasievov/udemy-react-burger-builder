import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {Object.entries(props.ingredients).map(([key, value]) => (
      <BuildControl
        key={key}
        label={key}
        added={() => props.ingredientAdded(value.id)}
        removed={() => props.ingredientRemoved(value.id)}
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
  ingredients: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.number,
  })).isRequired,
  price: PropTypes.number.isRequired,
  disabled: PropTypes.objectOf(PropTypes.bool).isRequired,
  purchasable: PropTypes.bool.isRequired,
  ordered: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default buildControls;
