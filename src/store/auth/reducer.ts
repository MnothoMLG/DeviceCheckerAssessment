import {createReducer} from '@reduxjs/toolkit';
import {loginRequest, logoutRequest} from './actions';
import {AuthState} from './types';

const INITIAL_STATE: Partial<AuthState> = {
  name: undefined,
  loggedIn: false,
};

export const authReducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(loginRequest, (state, action) => {
      if (action.payload) {
        const {
          payload: {name},
        } = action;
        state.name = name;
      }
    })
    .addCase(logoutRequest, () => {
      return {...INITIAL_STATE};
    });
});
