import { put } from 'redux-saga/effects';
import qs from 'qs';

import axios from '../../axios-orders';
import * as actions from '../actions';
import { BURGER_BUILDER } from '../../constants/api';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());

  try {
    const query = yield qs.stringify({ auth: action.token });
    const response = yield axios.post(`${BURGER_BUILDER.ORDERS}?${query}`, action.orderData);
    yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());

  try {
    const query = yield qs.stringify({
      auth: action.token,
      orderBy:
      '"userId"',
      equalTo: `"${action.userId}"`,
    });
    const response = yield axios.get(`${BURGER_BUILDER.ORDERS}?${query}`);
    const fetchedOrders = yield Object.entries(response.data)
      .map(([key, value]) => ({ ...value, id: key }));
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}
