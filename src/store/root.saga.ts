import {all} from 'redux-saga/effects';
import {watchDataSagas} from './data/sagas';

export default function* sagas() {
  yield all([watchDataSagas()]);
}
