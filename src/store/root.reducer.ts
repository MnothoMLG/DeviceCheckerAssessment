import {combineReducers} from '@reduxjs/toolkit';
import {dataReducer} from './data/reducer';
import {loadingReducer} from './loading/reducer';
import {alertReducer} from './alert/reducer';

export const reducers = combineReducers({
  data: dataReducer,
  loadingReducer,
  alertReducer,
});

export type AppState = ReturnType<typeof reducers>;
