import {AppState} from '../root.reducer';
export const getDataState = (app: AppState) => app.data;
export const getPostsSelector = (app: AppState) => app.data.posts;
export const getSelectedSort = (app: AppState) => app.data.sort;
