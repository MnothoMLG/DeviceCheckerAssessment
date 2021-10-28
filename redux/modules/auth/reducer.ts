/* eslint-disable @typescript-eslint/no-unused-vars */
import {createReducer} from '@reduxjs/toolkit';
import {
  login,
  logout,
  profileCompleted,
  profileIncomplete,
  updateProfile,
} from './actions';

const INITIAL_STATE = {
  loggedIn: false,
  profile: {
    number: '',
    name: '',
    message: 'Hi, I need your help. Urgently. Here are my co-ordinates',
  },
  profileComplete: false,
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
    return {...state, profile: payload, profileComplete: true};
  });
  builder.addCase(profileCompleted, (state, action) => {
    return {...state, profileComplete: true};
  });
  builder.addCase(profileIncomplete, (state, action) => {
    return {...state, profileComplete: false};
  });
});
