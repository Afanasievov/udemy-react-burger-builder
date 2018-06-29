import React from 'react';
import PropTypes from 'prop-types';

import classes from './Order.css';
import { countArrayElements } from '../../utils/arrays';
import { findKeyById } from '../../utils/objects';

const order = (props) => {
  const ingredientOutput = props.ingredients
    .filter((id, i) => props.ingredients.indexOf(id) === i)
    .map(id => (
      <span
        key={id}
        className={classes.IngredientName}
      >
        {findKeyById(props.ings, id)} ({countArrayElements(props.ingredients, id)})
      </span>
    ));

  return (
    <div className={classes.Order}>
      <p>Ingredients:{ingredientOutput}</p>
      <p>Price: <strong>USD {props.price}</strong></p>
    </div>
  );
};

order.propTypes = {
  ings: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.number,
  })).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.number).isRequired,
  price: PropTypes.number.isRequired,
};

export default order;
