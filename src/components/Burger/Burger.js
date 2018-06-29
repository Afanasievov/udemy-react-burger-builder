import React from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { findKeyById } from '../../utils/objects';

const burger = (props) => {
  let transformedOrderedIngredients = <p>Please, start adding ingredients!</p>;

  if (props.orderIngredients.length) {
    transformedOrderedIngredients = (
      <TransitionGroup>
        {
          props.orderIngredients.map(({ key, ingredientId }) => {
            const type = findKeyById(props.ings, ingredientId);
            return (
              <CSSTransition
                key={key}
                classNames={{
                  enter: classes.FadeEnter,
                  enterActive: classes.FadeEnterActive,
                  exit: classes.FadeExit,
                  exitActive: classes.FadeExitActive,
                }}
                timeout={500}
              >
                <BurgerIngredient type={type} />
              </CSSTransition>
            );
          })
            .reverse() // to add ingredients on the top
        }
      </TransitionGroup>
    );
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
  orderIngredients: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    ingredientId: PropTypes.number,
  })),
};

burger.defaultProps = {
  orderIngredients: [],
};

export default burger;
