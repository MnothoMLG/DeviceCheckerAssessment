import {createReducer} from '@reduxjs/toolkit';
import {fetchAllStoresSuccess} from './actions';

const INITIAL_STATE: any = {
  stores: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

export const storesReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(fetchAllStoresSuccess, (state, action) => {
    if (action.payload) {
      state.stores = action.payload;
    }
  });
});
