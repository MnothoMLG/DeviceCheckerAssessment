import {takeLatest, delay, put} from 'redux-saga/effects';
import {loginRequest, loginRequestError, loginRequestSuccess} from './actions';

export function* logUserIn({payload}: {payload: {name: string}; type: string}) {
  try {
    console.log({payload});
    yield delay(2000);
    yield put(loginRequestSuccess({...payload}));
  } catch (err) {
    yield put(loginRequestError());
    //if for some weird reason, the delay crashes ;]
  }
}

export function* watchAuthSagas() {
  yield takeLatest(loginRequest.type, logUserIn);
}
