/* eslint-disable @typescript-eslint/no-unused-vars */
import {createReducer} from '@reduxjs/toolkit';
import {login, logout} from './actions';

const INITIAL_STATE = {
  loggedIn: false,
};

export const authReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(login, (state, action) => {
    const {payload} = action;
    return {...state, loggedIn: true};
  });
  builder.addCase(logout, (state, action) => {
    const {payload} = action;
    return {...state, loggedIn: false};
  });
});
