import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {reducers} from './root.reducer';
import {sagas} from './root.saga';

// Middlewares setup
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: [sagaMiddleware],
});

// Running sagas
sagaMiddleware.run(sagas);

export {store};
