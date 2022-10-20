import {AppState} from '../root.reducer';
export const getAuthState = (app: AppState) => app.auth;
