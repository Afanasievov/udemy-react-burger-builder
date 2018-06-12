import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData,
});

export const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error,
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = orderData => (dispatch) => {
  dispatch(purchaseBurgerStart);
  axios
    .post('/orders.json', orderData)
    .then(response => dispatch(purchaseBurgerSuccess(response.data, orderData)))
    .catch(error => dispatch(purchaseBurgerFail(error)));
};

