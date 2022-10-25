import {AppState} from '../root.reducer';

export const getAlertState = (app: AppState) => app.alertReducer;
