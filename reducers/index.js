/*
 * combines all th existing reducers
 */

import dataReducer from './dataReducer';
import localState from './localState';
import cursorReducer from './cursorReducer';
import {combineReducers} from 'redux';

/* ------------- Assemble The Reducers ------------- */
export default combineReducers({
  dataReducer,
  localState,
  cursorReducer,
  // nonPersistantReducer
});
