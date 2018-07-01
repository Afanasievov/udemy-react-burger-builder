import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions';
import { BURGER_BUILDER } from '../../constants/api';
import { MAX_ING_ADD } from '../../constants/app';

export function* initIngredientsSaga() {
  try {
    const response = yield axios.get(BURGER_BUILDER.ORDER_DEFAULTS);
    yield put(actions.setIngredients(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed());
  }
}

export function* initAddIngredientSaga(action) {
  yield put(actions.addIngredient(action.id));
  if (action.currIngsAmount + 1 >= MAX_ING_ADD) {
    yield put(actions.toastOpen());
  }
}
