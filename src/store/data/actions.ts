import {createAction} from '@reduxjs/toolkit';
import {IEntry, IFetchPayload, IRedditPost, ISort, ISuccessPayload} from './types';

export const FETCH_ALL_LOADING_KEY = '@POSTS/FETCH_ALL';
export const FETCH_MORE_LOADING_KEY = '@POSTS/FETCH_MORE';
export const fetachAllRequest = createAction<IFetchPayload>(
  '@POSTS/FETCH_ALL_API_REQUEST',
);
export const fetachAllSuccess = createAction<ISuccessPayload>(
  '@POSTS/FETCH_ALL_API_SUCCESS',
);
export const loadMoreRequest = createAction<IFetchPayload>(
  '@POSTS/FETCH_MORE_API_REQUEST',
);
export const loadMoreSuccess = createAction<ISuccessPayload>(
  '@POSTS/FETCH_MORE_API_SUCCESS',
);
export const loadMoreError = createAction('@POSTS/FETCH_MORE_API_ERROR');
export const setSort = createAction<{sort: ISort}>('@POSTS/FETCH');
export const fetachAllError = createAction('@POSTS/FETCH_ALL_API_ERROR');
