import axios from 'axios';

import * as actionTypes from './actionTypes';
import * as API from '../../constants/api';
import * as LS from '../../constants/localStorage';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logout = () => {
  localStorage.removeItem(LS.BB_TOKEN);
  localStorage.removeItem(LS.BB_EXPIRATION_DATE);
  localStorage.removeItem(LS.BB_USER_ID);

  return { type: actionTypes.AUTH_LOGOUT };
};

const checkAuthTimeout = expirationTime => dispatch =>
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);

export const auth = (email, password, isSignIn) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  const path = isSignIn ? API.AUTH.SIGN_IN : API.AUTH.SIGN_UP;
  axios.post(`${API.AUTH.BASE_URL}${path}${process.env.REACT_APP_FIREBASE_KEY}`, authData)
    .then((response) => {
      const expirationDate = new Date(Date.now() + response.data.expiresIn * 1000);
      localStorage.setItem(LS.BB_TOKEN, response.data.idToken);
      localStorage.setItem(LS.BB_EXPIRATION_DATE, expirationDate);
      localStorage.setItem(LS.BB_USER_ID, response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch((err => dispatch(authFail(err.response.data.error))));
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem(LS.BB_TOKEN);
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem(LS.BB_EXPIRATION_DATE));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem(LS.BB_USER_ID);
      dispatch(authSuccess(token, userId));
      dispatch(checkAuthTimeout((expirationDate.getTime() - Date.now()) / 1000));
    }
  }
};
