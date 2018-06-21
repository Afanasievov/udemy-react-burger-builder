import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { BURGER_BUILDER } from '../../config/api';

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

export const purchaseBurger = (orderData, token) => (dispatch) => {
  dispatch(purchaseBurgerStart());
  axios
    .post(`${BURGER_BUILDER.PATH_ORDERS}${token}`, orderData)
    .then(response => dispatch(purchaseBurgerSuccess(response.data.name, orderData)))
    .catch(error => dispatch(purchaseBurgerFail(error)));
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetchOrderFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error,
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = (token, userId) => (dispatch) => {
  dispatch(fetchOrdersStart());
  const queryParams = `${token}&orderBy="userId"&equalTo="${userId}"`;
  axios.get(`${BURGER_BUILDER.PATH_ORDERS}${queryParams}`)
    .then((res) => {
      const fetchedOrders = Object.entries(res.data)
        .map(([key, value]) => ({ ...value, id: key }));

      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch((err) => {
      dispatch(fetchOrderFail(err));
    });
};
