import {put, takeLatest} from 'redux-saga/effects';
import {
  fetchAllStoresRequest,
  fetchAllStoresError,
  fetchAllStoresSuccess,
} from './actions';

export function* fetchStores({}: {payload: boolean; type: string}) {
  try {
    // TODO: call the firebase db for the data
    // yield call(() => client.get("/customer-api/logout"));
    yield put(fetchAllStoresSuccess([2, 2, 3, 3, 33])); // clear unmatch refunds on logout
  } catch (err) {
    yield put(fetchAllStoresError(true));
  }
}

export function* watchCustomerSagas() {
  yield takeLatest(fetchAllStoresRequest.type, fetchStores);
}
