import React from 'react';

import Aux from '../../../hoc/Aux';

const orderSummary = ({ ingredients }) => {
  const ingredientSummary = Object.entries(ingredients).map(([key, value]) => (
    <li key={key}>
      <span style={{ textTransform: 'capitalize' }}>{key}</span>: {value}
    </li>
  ));
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
    </Aux>
  );
};

export default orderSummary;
