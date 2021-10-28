import {createAction} from '@reduxjs/toolkit';
export const login = createAction('@AUTH/LOGIN');
export const logout = createAction('@AUTH/LOGOUT');
export const updateProfile = createAction<{
  name?: string;
  number: string;
  message?: string;
}>('@AUTH/UPDATE_PROFILE');

export const profileIncomplete = createAction('@AUTH/INCOMPLETE_PROFILE');
export const profileCompleted = createAction('@AUTH/COMPLETE_PROFILE');
