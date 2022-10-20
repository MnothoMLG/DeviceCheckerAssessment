import {createAction} from '@reduxjs/toolkit';

export const LOGIN_LOADING_KEY = '@AUTH/LOGIN';
export const loginRequest = createAction<{name: string}>(
  '@AUTH/LOGIN_API_REQUEST',
);
export const loginRequestSuccess = createAction<{name: string}>(
  '@AUTH/LOGIN_API_SUCCESS',
);
export const loginRequestError = createAction('@AUTH/LOGIN_API_ERROR');
export const logoutRequest = createAction('@AUTH/LOGOUT');
