import React from 'react';
import PropTypes from 'prop-types';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = props => (
  <div className={classes.CheckoutSummary}>
    <h1>We hope it tastes well!</h1>
    <div style={{ width: '100%', height: '400px', margin: 'auto' }}>
      <Burger orderIngredients={props.orderIngredients} ings={props.ings} />
    </div>
    <Button btnType="Danger" clicked={props.checkoutCancelled}>
      CANCEL
    </Button>
    <Button btnType="Success" clicked={props.checkoutContinued}>
      CONTINUE
    </Button>
  </div>
);

checkoutSummary.propTypes = {
  ings: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.number,
  })).isRequired,
  orderIngredients: PropTypes.arrayOf(PropTypes.number).isRequired,
  checkoutCancelled: PropTypes.func.isRequired,
  checkoutContinued: PropTypes.func.isRequired,
};

export default checkoutSummary;
