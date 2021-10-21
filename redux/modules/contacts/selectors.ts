import { AppState } from "../../root.reducer";

// here we can grab a piece of the state
export const getAlertVisibility = (app: AppState) => app.alert.visible;
export const getAlertMessage = (app: AppState) => app.alert.message;
export const getAlertVariant = (app: AppState) => app.alert.variant;
export const getAlertActionButton = (app: AppState) => app.alert.button;
