export const updateObject = (oldObj, updatedProperties) => ({
  ...oldObj,
  ...updatedProperties,
});

export const countArrayElements = (array, el) =>
  array.reduce((memo, curr) => {
    if (el === curr) return memo + 1;
    return memo;
  }, 0);
