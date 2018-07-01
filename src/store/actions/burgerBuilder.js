import * as actionTypes from './actionTypes';

export const initAddIngredient = (id, currIngsAmount) => ({
  type: actionTypes.INIT_ADD_INGREDIENT,
  id,
  currIngsAmount,
});

export const addIngredient = id => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientId: id,
});

export const removeIngredient = id => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientId: id,
});

export const setIngredients = orderDefaults => ({
  type: actionTypes.SET_INGREDIENTS,
  orderDefaults,
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENT_FAILED,
});

export const initIngredients = () => ({
  type: actionTypes.INIT_INGREDIENTS,
});
