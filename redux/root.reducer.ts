import {combineReducers} from '@reduxjs/toolkit';
import {storesReducer} from './modules/stores/reducer';
import {loadingReducer} from './modules/loading/reducer';
import {alertReducer} from './modules/alert/reducer';
import {contactsReducer} from './modules/contacts/reducer';
import {authReducer} from './modules/auth/reducer';

export const reducers = combineReducers({
  loadingReducer,
  storesReducer: storesReducer,
  alert: alertReducer,
  contactsReducer,
  authReducer,
});

export type AppState = ReturnType<typeof reducers>;
