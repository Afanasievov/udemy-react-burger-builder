import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = state => updateObject(state, { purchased: false });

const purchaseBurgerStart = state => updateObject(state, { loading: true });

const purchaseBurgerSuccess = (state, action) => updateObject(
  state,
  {
    loading: false,
    purchased: true,
    orders: state.orders.concat({ ...action.orderData, id: action.orderId }),
  },
);

const purchaseBurgerFail = state => updateObject(state, { loading: false });

const fetchOrdersStart = state => updateObject(state, { loading: true });

const fetchOrdersSuccess = (state, action) => updateObject(
  state,
  {
    orders: action.orders,
    loading: false,
  },
);

const fetchOrderFail = state => updateObject(state, { loading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: return purchaseInit(state);
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
    case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state);
    default:
      return state;
  }
};

export default reducer;
