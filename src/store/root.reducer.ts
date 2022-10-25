import {combineReducers} from '@reduxjs/toolkit';
import {dataReducer} from './data/reducer';
import {loadingReducer} from './loading/reducer';

export const reducers = combineReducers({
  data: dataReducer,
  loadingReducer,
});

export type AppState = ReturnType<typeof reducers>;
