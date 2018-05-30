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
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

orderSummary.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)).isRequired,
  price: PropTypes.number.isRequired,
  purchaseCancelled: PropTypes.bool.isRequired,
  purchaseContinued: PropTypes.bool.isRequired,
};

export default orderSummary;
