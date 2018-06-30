import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

import { BURGER_BUILDER } from '../../constants/api';
import { MAX_ING_ADD } from '../../constants/app';

export const addIngredient = (id, currIngsAmount) => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_INGREDIENT,
    ingredientId: id,
  });
  if (currIngsAmount + 1 >= MAX_ING_ADD) {
    dispatch({ type: actionTypes.TOAST_OPEN });
  }
};

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

export const initIngredients = () => dispatch =>
  axios
    .get(BURGER_BUILDER.ORDER_DEFAULTS)
    .then(response => dispatch(setIngredients(response.data)))
    .catch(() => dispatch(fetchIngredientsFailed()));
