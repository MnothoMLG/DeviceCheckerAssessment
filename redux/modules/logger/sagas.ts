import { call, put, takeLatest } from "redux-saga/effects";
import { ErrorState } from "./types";
import { showMessage } from "react-native-flash-message";
import { logOutRequest } from "../stores/actions";

export function* processLog({ payload: error }: { type: string; payload: ErrorState }) {
  // eslint-disable-next-line no-useless-catch
  try {
    if (error.statusCode === 401) {
      // showMessage({
      //   message: "Error",
      //   description: "Your token has expired",
      //   type: "danger",
      //   duration: 6000,
      //   color: APP_COLORS.white,
      //   backgroundColor: APP_COLORS.red,
      // });
      yield put(logOutRequest(true));
    } else if ([403, 400].includes(error.statusCode)) {
      // no-toast for these
      return;
    } else if (error.statusCode !== 200) {
      // showMessage({
      //   message: "Error",
      //   description: "An error has ocurred",
      //   type: "danger",
      //   duration: 6000,
      //   color: APP_COLORS.white,
      //   backgroundColor: APP_COLORS.red,
      // });
    }

    // Should log to Datadog, Sentry, Dynatrace, etc
    yield call(() => {
      return false;
    });
  } catch (err) {
    throw err;
  }
}

export function* watchLoggerSagas() {
  yield takeLatest((action: any) => /(.*)_API_ERROR/.test(action.type), processLog);
}
