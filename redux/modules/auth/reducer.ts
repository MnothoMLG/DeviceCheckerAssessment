/* eslint-disable @typescript-eslint/no-unused-vars */
import {createReducer} from '@reduxjs/toolkit';
import {login, logout, updateProfile} from './actions';

const INITIAL_STATE = {
  loggedIn: false,
  profile: {
    number: 'testnumberID',
    name: null,
    message: 'Hi, I need your help. Urgently. Here are my co-ordinates',
  },
};

export const authReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(login, state => {
    return {...state, loggedIn: true};
  });
  builder.addCase(logout, state => {
    return {...state, loggedIn: false};
  });
  builder.addCase(updateProfile, (state, action) => {
    const {payload} = action;
    return {...state, profile: payload};
  });
});
