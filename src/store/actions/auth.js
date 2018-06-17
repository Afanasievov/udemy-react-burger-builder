import axios from 'axios';

import * as actionTypes from './actionTypes';
import * as API from '../../config/api';
import { FIREBASE_KEY } from '../../config/creds';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  authData,
});

export const authFail = error => ({
  type: actionTypes.AUTH_SUCCESS,
  error,
});

export const auth = (email, password) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  axios.post(`${API.AUTH.BASE_URL}${API.AUTH.SIGN_UP}${FIREBASE_KEY}`, authData)
    .then((response) => {
      console.log('auth response: ', response);
      dispatch(authSuccess(response.data));
    })
    .catch((err) => {
      console.log('auth err: ', err);
      dispatch(authSuccess(err));
    });
};
