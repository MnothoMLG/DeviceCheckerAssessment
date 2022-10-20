import {createReducer} from '@reduxjs/toolkit';
import {loginRequestSuccess, logoutRequest} from './actions';
import {AuthState} from './types';

const INITIAL_STATE: Partial<AuthState> = {
  name: undefined,
  loggedIn: false,
};

export const authReducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(loginRequestSuccess, (state, action) => {
      if (action.payload) {
        const {
          payload: {name},
        } = action;
        state.name = name;
        state.loggedIn = true;
      }
    })
    .addCase(logoutRequest, () => {
      return {...INITIAL_STATE};
    });
});
