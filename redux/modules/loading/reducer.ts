import {createReducer} from '@reduxjs/toolkit';
import {endLoading} from './actions';
import {startLoading} from './actions';

const INITIAL_STATE = {
  loading: false,
};

export const loadingReducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(startLoading, state => {
      return {...state, loading: true};
    })
    .addCase(endLoading, state => {
      return {...state, loading: false};
    });
});
