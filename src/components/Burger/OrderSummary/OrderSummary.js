import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Auxiliary/Aux';
import Button from '../../UI/Button/Button';
import { countArrayElements } from '../../../shared/utility';

const orderSummary = (props) => {
  const ingredientSummary = props.orderIngredients
    .filter((ing, i) => props.orderIngredients.indexOf(ing) === i)
    .map((ing) => {
      const count = countArrayElements(props.orderIngredients, ing);
      return (
        <li key={ing}>
          <span style={{ textTransform: 'capitalize' }}>{ing}</span>: {count}
        </li>
      );
    });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" disabled={false} clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" disabled={false} clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

orderSummary.propTypes = {
  orderIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  purchaseCancelled: PropTypes.func.isRequired,
  purchaseContinued: PropTypes.func.isRequired,
};

export default orderSummary;
