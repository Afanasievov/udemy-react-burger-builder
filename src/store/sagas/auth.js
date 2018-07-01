import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';

import * as actions from '../actions';
import * as LS from '../../constants/localStorage';

export function* logoutSaga() {
  yield localStorage.removeItem(LS.BB_TOKEN);
  yield localStorage.removeItem(LS.BB_EXPIRATION_DATE);
  yield localStorage.removeItem(LS.BB_USER_ID);

  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}
