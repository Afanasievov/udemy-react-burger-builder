import axios from 'axios';

import * as actionTypes from './actionTypes';
import * as API from '../../config/api';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId,
});

export const authFail = error => ({
  type: actionTypes.AUTH_SUCCESS,
  error,
});

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
      console.log('auth response: ', response);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
    })
    .catch((err) => {
      console.log('auth err: ', err);
      dispatch(authSuccess(err));
    });
};
