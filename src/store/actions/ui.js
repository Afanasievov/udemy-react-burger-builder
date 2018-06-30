import * as actionTypes from './actionTypes';

export const modalOpen = () => ({
  type: actionTypes.MODAL_OPEN,
});

export const modalClose = () => ({
  type: actionTypes.MODAL_CLOSE,
});

export const toastOpen = () => ({
  type: actionTypes.TOAST_OPEN,
});

export const toastClose = () => ({
  type: actionTypes.TOAST_CLOSE,
});
