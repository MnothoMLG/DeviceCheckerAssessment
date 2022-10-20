import {all} from 'redux-saga/effects';
import {watchAuthSagas} from './auth/sagas';

export default function* sagas() {
  yield all([watchAuthSagas()]);
}
