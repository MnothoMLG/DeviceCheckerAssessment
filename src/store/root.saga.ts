import {loginRequest} from './auth/actions';
import {takeEvery, all, delay} from 'redux-saga/effects';

export function* loginAsync() {
  // yield put(loginActions.enableLoader());

  // After calling API:
  // mock success response
  const response = {success: true, data: {id: 1}, message: 'Success'};
  yield delay(3000);
  // mock failure response
  // const response = { success: false, data: { id: 0 }, message: 'Failed' };

  if (response.success) {
    // yield put(loginActions.onLoginResponse(response.data));
    // yield put(loginActions.disableLoader());
    // no need to call navigate as this is handled by redux store with SwitchNavigator
    //yield call(navigationActions.navigateToHome);
  } else {
    // yield put(loginActions.loginFailed());
    // yield put(loginActions.disableLoader());
    // setTimeout(() => {
    //   Alert.alert('Failure', response.message);
    // }, 200);
  }
}

export default function* watch() {
  yield all([takeEvery(loginRequest.type, loginAsync)]);
}
