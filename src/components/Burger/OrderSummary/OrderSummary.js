import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Auxiliary/Aux';
import Button from '../../UI/Button/Button';
import { countArrayElements } from '../../../utils/arrays';
import { findKeyById } from '../../../utils/objects';

const orderSummary = (props) => {
  const ingredientSummary = props.orderIngredients
    .map(({ ingredientId }) => ingredientId)
    .filter((id, i) => props.orderIngredients.indexOf(id) === i)
    .map((id) => {
      const count = countArrayElements(props.orderIngredients, id);
      return (
        <li key={id}>
          <span style={{ textTransform: 'capitalize' }}>
            {findKeyById(props.ings, id)}
          </span>: {count}
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
  ings: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.number,
  })).isRequired,
  orderIngredients: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    ingredientId: PropTypes.number,
  })).isRequired,
  price: PropTypes.number.isRequired,
  purchaseCancelled: PropTypes.func.isRequired,
  purchaseContinued: PropTypes.func.isRequired,
};

export default orderSummary;
