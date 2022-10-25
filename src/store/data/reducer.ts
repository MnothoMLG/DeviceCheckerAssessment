import {createReducer} from '@reduxjs/toolkit';
import {fetachAllSuccess, loadMoreSuccess, setSort} from './actions';
import {DataState} from './types';

const INITIAL_STATE: DataState = {
  sort: 'Hot',
  after: '',
  posts: [],
};

export const dataReducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(fetachAllSuccess, (state, action) => {
      if (action.payload) {
        const {payload} = action;
        return {...state, ...payload};
      }
    })
    .addCase(setSort, (state, action) => {
      if (action.payload) {
        const {payload} = action;
        return {...state, ...payload};
      }
    })
    .addCase(loadMoreSuccess, (state, action) => {
      if (action.payload) {
        const {payload} = action;
        return {
          ...state,
          after: payload.after,
          posts: [...state.posts, ...payload.posts],
        };
      }
    });
});
