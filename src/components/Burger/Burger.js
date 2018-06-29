import React from 'react';
import PropTypes from 'prop-types';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { findKeyById } from '../../utils/objects';

const burger = (props) => {
  let transformedOrderedIngredients = <p>Please, start adding ingredients!</p>;

  if (props.orderIngredients.length) {
    transformedOrderedIngredients =
      props.orderIngredients.map((id, i) => {
        const type = findKeyById(props.ings, id);
        const key = `${type}${i}`;
        return <BurgerIngredient key={key} type={type} />;
      })
        .reverse(); // to add ingredients on the top
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedOrderedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

burger.propTypes = {
  ings: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.number,
  })).isRequired,
  orderIngredients: PropTypes.arrayOf(PropTypes.number),
};

burger.defaultProps = {
  orderIngredients: [],
};

export default burger;
