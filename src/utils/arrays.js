/* eslint-disable import/prefer-default-export */
export const countArrayElements = (array, el) =>
  array.reduce((memo, curr) => {
    if (el === curr) return memo + 1;
    return memo;
  }, 0);

// TODO: remove eslint-disable after adding new methods
