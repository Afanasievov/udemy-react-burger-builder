export const updateObject = (oldObj, updatedProperties) => ({
  ...oldObj,
  ...updatedProperties,
});

export const findKeyById = (obj, id) => {
  let res;
  Object.entries(obj).find(([key, val]) => {
    if (val.id === id) {
      res = key;
      return true;
    }
    return false;
  });

  return res;
};
