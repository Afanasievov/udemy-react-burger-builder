import React from 'react';
import PropTypes from 'prop-types';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  // const transformedIngredients = Object.keys(props.ingredients)
  //   .map((igKey) =>
  //     [...Array(props.ingredients[igKey])]
  //       .map((_, i) => {
  //         const key = igKey + i;
  //         return <BurgerIngredient key={key} type={igKey} />;
  //       }));

  console.log('props.ingredients: ', props.ingredients);
  let transformedIngredients = Object.entries(props.ingredients)
    // .filter(([name]) => name !== 'totalPrice')
    .map(([name, value]) =>
      [...Array(value)]
        .map((_, i) => {
          const key = name + i;
          return <BurgerIngredient key={key} type={name} />;
        }))
    .reduce((memo, curr) => memo.concat(curr), []);

  if (!transformedIngredients.length) {
    transformedIngredients = <p>Please, start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

burger.propTypes = {
  ingredients: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default burger;
