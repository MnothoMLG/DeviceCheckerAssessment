import {all} from 'redux-saga/effects';

import {watchLoggerSagas} from './modules/logger/sagas';
import {watchCustomerSagas} from './modules/stores/sagas';

export function* sagas() {
  yield all([watchLoggerSagas(), watchCustomerSagas()]);
}
