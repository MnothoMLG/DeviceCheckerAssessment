import {createAction} from '@reduxjs/toolkit';
export const login = createAction('@AUTH/LOGIN');
export const logout = createAction('@AUTH/LOGOUT');
export const updateProfile = createAction<{
  name: string;
  number: string;
  message?: string;
}>('@AUTH/UPDATE_PROFILE');
