import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/objects';

export const initialState = {
  isShowModal: false,
  isShowToast: false,
};

const modalOpen = state => updateObject(
  state,
  { isShowModal: true },
);
const modalClose = state => updateObject(
  state,
  { isShowModal: false },
);
const toastOpen = state => updateObject(
  state,
  { isShowToast: true },
);
const toastClose = state => updateObject(
  state,
  { isShowToast: false },
);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODAL_OPEN: return modalOpen(state);
    case actionTypes.MODAL_CLOSE: return modalClose(state);
    case actionTypes.TOAST_OPEN: return toastOpen(state);
    case actionTypes.TOAST_CLOSE: return toastClose(state);
    default:
      return state;
  }
};

export default reducer;
