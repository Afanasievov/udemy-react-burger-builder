import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import axios from 'axios';
import qs from 'qs';

import * as actions from '../actions';
import * as LS from '../../constants/localStorage';
import * as API from '../../constants/api';

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

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  const path = action.isSignIn ? API.AUTH.SIGN_IN : API.AUTH.SIGN_UP;
  const query = qs.stringify({ key: process.env.REACT_APP_FIREBASE_KEY });

  try {
    const response = yield axios.post(`${API.AUTH.BASE_URL}${path}?${query}`, authData);

    const expirationDate = yield new Date(Date.now() + response.data.expiresIn * 1000);
    yield localStorage.setItem(LS.BB_TOKEN, response.data.idToken);
    yield localStorage.setItem(LS.BB_EXPIRATION_DATE, expirationDate);
    yield localStorage.setItem(LS.BB_USER_ID, response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}
