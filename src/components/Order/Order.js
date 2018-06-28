import React from 'react';
import PropTypes from 'prop-types';

import classes from './Order.css';
import { countArrayElements } from '../../shared/utility';

const order = (props) => {
  const ingredientOutput = props.ingredients
    .filter((ing, i) => props.ingredients.indexOf(ing) === i)
    .map(ing => (
      <span
        key={ing}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '5px 8px',
          border: '1px solid #ccc',
          padding: '5px',
        }}
      >
        {ing} ({countArrayElements(props.ingredients, ing)})
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
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
};

export default order;
