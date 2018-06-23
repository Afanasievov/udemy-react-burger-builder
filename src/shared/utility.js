// eslint-disable-next-line import/prefer-default-export
export const updateObject = (oldObj, updatedProperties) => ({
  ...oldObj,
  ...updatedProperties,
});
