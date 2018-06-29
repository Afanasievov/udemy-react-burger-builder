import React from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';
import { capitalize } from '../../../utils/strings';

const burgerIngredient = (props) => {
  switch (props.type) {
    case 'bread-bottom':
      return <div className={classes.BreadBottom} />;
    case 'bread-top':
      return (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1} />
          <div className={classes.Seeds2} />
        </div>
      );
    default: // corresponding css-class should exist!
      return <div className={classes[capitalize(props.type)]} />;
  }
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default burgerIngredient;
