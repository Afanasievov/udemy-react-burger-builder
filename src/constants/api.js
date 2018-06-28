// .env* files must be presented in the root project folder

export const AUTH = {
  BASE_URL: process.env.REACT_APP_AUTH_BASE_URL,
  SIGN_IN: 'verifyPassword?key=',
  SIGN_UP: 'signupNewUser?key=',
};
export const BURGER_BUILDER = {
  BASE_URL: 'https://react-burger-builder-f06ca.firebaseio.com/',
  ORDER_DEFAULTS: 'orderDefaults.json',
  ORDERS: 'orders.json?auth=',
};
