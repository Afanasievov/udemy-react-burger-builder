import React from 'react';

import classes from './Order.css';

const order = (props) => {
  // const ingrdientOutpout = '';
  // Object.entries(props.ingredients)
  // .forEach(([key, value]) => { ingrdientOutpout[key] = value; });

  const ingrdientOutpout = Object.entries(props.ingredients)
    .map(([key, value]) => (
      <span
        key={key}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '5px 8px',
          border: '1px solid #ccc',
          padding: '5px',
        }}
      >
        {key} ({value})
      </span>
    ));

  return (
    <div className={classes.Order}>
      <p>Ingredients:{ingrdientOutpout}</p>
      <p>Price: <strong>USD {props.price}</strong></p>
    </div>
  );
};

export default order;
