import {AxiosResponse} from 'axios';
import {takeLatest, put, call} from 'redux-saga/effects';
import {client} from '../../api/api';
import strings from '../../constants/strings';
import {setAndShowFeedback} from '../alert/actions';
import { store } from '../root.store';
import {
  fetachAllError,
  fetachAllRequest,
  fetachAllSuccess,
  loadMoreError,
  loadMoreRequest,
  loadMoreSuccess,
} from './actions';
import {IEntry, IFetchPayload, IResponse} from './types';

const {error} = strings;

export function* fetchData({payload}: {payload: IFetchPayload; type: string}) {
  const {sort} = payload;
  try {
    const response: AxiosResponse<IEntry<IResponse, string>> = yield call(() =>
      client.get(`r/aww/${sort.toLowerCase()}/.json`),
    );
    const data = response.data.data;
    yield put(fetachAllSuccess({posts: data.children, after: data.after}));
  } catch (err) {
    yield put(fetachAllError());
    yield put(
      setAndShowFeedback({
        title: error.title,
        message: error.message,
        left: {
          ...error.left,
          onPress: () => {},
        },
        right: {
          ...error.right,
          onPress: () => {
            store.dispatch(fetachAllRequest({sort}));
          },
        },
        variant: 'success',
        visible: true,
      }),
    );
    //if for some weird reason, the delay crashes ;]
  }
}

export function* loadMoreData({
  payload,
}: {
  payload: IFetchPayload;
  type: string;
}) {
  const {sort, after} = payload;
  try {
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
    yield put(
      setAndShowFeedback({
        title: error.title,
        message: error.message,
        left: {
          ...error.left,
          onPress: () => {},
        },
        right: {
          ...error.right,
          onPress: () => {
            store.dispatch(fetachAllRequest({sort, after}));
          },
        },
        variant: 'success',
        visible: true,
      }),
    );
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
