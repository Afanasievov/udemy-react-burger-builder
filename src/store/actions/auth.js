import * as actionTypes from './actionTypes';
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

export const logout = () => ({ type: actionTypes.AUTH_INITIATE_LOGOUT });

export const logoutSucceed = () => ({ type: actionTypes.AUTH_LOGOUT });

export const checkAuthTimeout = expirationTime => ({
  type: actionTypes.AUTH_CHECK_TIMEOUT,
  expirationTime,
});

export const auth = (email, password, isSignIn) => ({
  type: actionTypes.AUTH_USER,
  email,
  password,
  isSignIn,
});

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
