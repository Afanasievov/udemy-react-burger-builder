import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

import { BURGER_BUILDER } from '../../constants/api';

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

export const initIngredients = () => dispatch =>
  axios
    .get(BURGER_BUILDER.ORDER_DEFAULTS)
    .then(response => dispatch(setIngredients(response.data)))
    .catch(() => dispatch(fetchIngredientsFailed()));
