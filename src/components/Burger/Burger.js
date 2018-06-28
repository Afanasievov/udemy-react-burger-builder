import React from 'react';
import PropTypes from 'prop-types';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let transformedOrderedIngredients = <p>Please, start adding ingredients!</p>;

  if (props.ingredients.length) {
    transformedOrderedIngredients =
      props.ingredients.map((ing, i) => {
        const key = ing + i;
        return <BurgerIngredient key={key} type={ing} />;
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
  ingredients: PropTypes.arrayOf(PropTypes.string),
};

burger.defaultProps = {
  ingredients: [],
};

export default burger;
