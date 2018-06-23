import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.45,
  meat: 1.3,
  bacon: 0.75,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: +(state.totalPrice + INGREDIENT_PRICES[action.ingredientName]).toFixed(2),
    building: true,
  };

  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: +(state.totalPrice + INGREDIENT_PRICES[action.ingredientName]).toFixed(2),
    building: true,
  };

  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => updateObject(
  state,
  {
    ingredients: action.ingredients,
    totalPrice: initialState.totalPrice,
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
