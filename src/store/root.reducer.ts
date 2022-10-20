import {combineReducers} from '@reduxjs/toolkit';
import {authReducer} from './auth/reducer';

export const reducers = combineReducers({
  auth: authReducer,
});

export type AppState = ReturnType<typeof reducers>;
