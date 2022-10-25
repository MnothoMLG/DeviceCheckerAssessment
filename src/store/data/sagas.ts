import {AxiosResponse} from 'axios';
import {takeLatest, put, call} from 'redux-saga/effects';
import {client} from '../../api/api';
import {
  fetachAllError,
  fetachAllRequest,
  fetachAllSuccess,
  loadMoreError,
  loadMoreRequest,
  loadMoreSuccess,
} from './actions';
import {IEntry, IFetchPayload, IResponse} from './types';

export function* fetchData({payload}: {payload: IFetchPayload; type: string}) {
  try {
    const {sort} = payload;
    const response: AxiosResponse<IEntry<IResponse, string>> = yield call(() =>
      client.get(`r/aww/${sort.toLowerCase()}/.json`),
    );

    console.log({response});

    const data = response.data.data;
    yield put(fetachAllSuccess({posts: data.children, after: data.after}));
  } catch (err) {
    yield put(fetachAllError());
    //if for some weird reason, the delay crashes ;]
  }
}

export function* loadMoreData({
  payload,
}: {
  payload: IFetchPayload;
  type: string;
}) {
  try {
    const {sort, after} = payload;

    const response: AxiosResponse<IEntry<IResponse, string>> = yield call(() =>
      client.get(`r/aww/${sort.toLowerCase()}/.json`, {
        params: {
          after,
        },
      }),
    );
    const data = response.data.data;
    yield put(loadMoreSuccess({posts: data.children, after: data.after}));
  } catch (err) {
    yield put(loadMoreError());
    //if for some weird reason, the delay crashes ;]
  }
}

export function* watchDataSagas() {
  //Could use yield all and have one saga listen for both actions
  yield takeLatest(fetachAllRequest.type, fetchData);
  yield takeLatest(loadMoreRequest.type, loadMoreData);

  //Gave some errors -
  // while (true) {
  //   yield all([take(fetachAllRequest.type), take(loadMoreRequest.type)]);
  //   yield call(fetchData);
  // }
}
