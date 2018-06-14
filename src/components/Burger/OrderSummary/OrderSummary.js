import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Auxiliary/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.entries(props.ingredients).map(([key, value]) => (
    <li key={key}>
      <span style={{ textTransform: 'capitalize' }}>{key}</span>: {value}
    </li>
  ));
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price}</strong>
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
  ingredients: PropTypes.objectOf(PropTypes.number).isRequired,
  price: PropTypes.number.isRequired,
  purchaseCancelled: PropTypes.func.isRequired,
  purchaseContinued: PropTypes.func.isRequired,
};

export default orderSummary;
