import {createAction} from '@reduxjs/toolkit';

export const loginRequest = createAction<{name: string}>('@AUTH/LOGIN');
export const logoutRequest = createAction('@AUTH/LOGOUT');
