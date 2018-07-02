import * as actionTypes from '@actions/actionTypes';
import reducer, { initialState } from './auth';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should store a token upon login', () => {
    expect(reducer(initialState, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'some-token',
      userId: 'some-user-id',
    })).toEqual({
      ...initialState,
      token: 'some-token',
      userId: 'some-user-id',
    });
  });
});
