import {combineReducers} from '@reduxjs/toolkit';
import {authReducer} from './auth/reducer';
import {loadingReducer} from './loading/reducer';

export const reducers = combineReducers({
  auth: authReducer,
  loadingReducer,
});

export type AppState = ReturnType<typeof reducers>;
