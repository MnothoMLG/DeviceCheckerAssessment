import createSagaMiddleware from 'redux-saga';
import {reducers} from './root.reducer';
import sagas from './root.saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';

// Middlewares setup
// const middleware = [];
// const sagaMiddleware = createSagaMiddleware();

// middleware.push(sagaMiddleware);
// const config = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['auth'],
//   debug: true, //to get useful logging
// };
// const enhancers = [applyMiddleware(...middleware)];
// const persistedReducers = persistCombineReducers(config, reducers);
// const persistConfig: any = {enhancers};
// const store = createStore(persistedReducers, undefined, compose(...enhancers));
// const persistor = persistStore(store, persistConfig, () => {
//   //   console.log('Test', store.getState());
// });

// // Running sagas
// sagaMiddleware.run(sagas);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: [sagaMiddleware],
});

// Running sagas
sagaMiddleware.run(sagas);

export {store};
