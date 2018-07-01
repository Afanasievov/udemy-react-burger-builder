import { put } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import * as LS from '../../constants/localStorage';

/* eslint-disable import/prefer-default-export */
export function* logoutSaga() {
  yield localStorage.removeItem(LS.BB_TOKEN);
  yield localStorage.removeItem(LS.BB_EXPIRATION_DATE);
  yield localStorage.removeItem(LS.BB_USER_ID);

  yield put({ type: actionTypes.AUTH_LOGOUT });
}
