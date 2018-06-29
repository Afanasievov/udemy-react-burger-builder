import * as actionTypes from '../actions/actionTypes';
import { updateObject, findKeyById } from '../../utils/objects';

const initialState = {
  ingredients: null,
  totalPrice: null,
  orderIngredients: [],
  error: false,
  building: false,
};

const addIngredient = (state, action) => {
  const orderIngredients = state.orderIngredients.concat(action.ingredientId);
  const { price } = state.ingredients[findKeyById(state.ingredients, action.ingredientId)];
  const updatedState = {
    orderIngredients,
    totalPrice: +(state.totalPrice + price).toFixed(2),
    building: true,
  };

  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const orderIngredients = [...state.orderIngredients];
  orderIngredients.splice(state.orderIngredients.lastIndexOf(action.ingredientId), 1);
  const { price } = state.ingredients[findKeyById(state.ingredients, action.ingredientId)];
  const updatedState = {
    orderIngredients,
    totalPrice: +(state.totalPrice - price).toFixed(2),
    building: true,
  };

  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => updateObject(
  state,
  {
    ingredients: action.orderDefaults.ingredients,
    totalPrice: action.orderDefaults.initialPrice,
    orderIngredients: [],
    error: false,
    building: false,
  },
);

const fetchIngredientFailed = state => updateObject(
  state,
  { error: true },
);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredientFailed(state, action);
    default: return state;
  }
};

export default reducer;
