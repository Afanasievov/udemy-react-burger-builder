import React from 'react';
import PropTypes from 'prop-types';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = props => (
  <div className={classes.CheckoutSummary}>
    <h1>We hope it tastes well!</h1>
    <div style={{ width: '100%', height: '400px', margin: 'auto' }}>
      <Burger ingredients={props.ingredients} />
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
  ingredients: PropTypes.objectOf(PropTypes.number).isRequired,
  checkoutCancelled: PropTypes.func.isRequired,
  checkoutContinued: PropTypes.func.isRequired,
};

export default checkoutSummary;
