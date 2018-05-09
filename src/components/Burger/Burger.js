import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  /* prettier-ignore */
  // const transformedIngredients = Object.keys(props.ingredients)
  //   .map((igKey) =>
  //     [...Array(props.ingredients[igKey])]
  //       .map((_, i) => {
  //         const key = igKey + i;
  //         return <BurgerIngredient key={key} type={igKey} />;
  //       }));

  /* prettier-ignore */
  const transformedIngredients = Object.entries(props.ingredients)
    .map(([name, value]) =>
      [...Array(value)]
        .map((_, i) => {
          const key = name + i;
          return <BurgerIngredient key={key} type={name} />;
        }));

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
