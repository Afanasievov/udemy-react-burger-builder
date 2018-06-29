/* eslint-disable import/prefer-default-export */
export const updateObject = (oldObj, updatedProperties) => ({
  ...oldObj,
  ...updatedProperties,
});

// TODO: remove eslint-disable after adding new methods
