import {createAction} from '@reduxjs/toolkit';

export const FETCH_ALL_STORES_LOADING_KEY = '@STORE/FETCH_STORES';
export const fetchAllStoresRequest = createAction(
  '@CUSTOMER/FETCH_STORES_API_REQUEST',
);
export const fetchAllStoresSuccess = createAction<any>(
  '@CUSTOMER/FETCH_STORES_API_SUCCESS',
);
export const fetchAllStoresError = createAction<any>(
  '@CUSTOMER/FETCH_STORES_API_ERROR',
);
