import createSagaMiddleware from 'redux-saga';
import {reducers} from './root.reducer';
import sagas from './root.saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';

const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
  debug: true, //to get useful logging
};

const persistedReducers = persistReducer(config, reducers);
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducers,
  devTools: true,
  middleware: [sagaMiddleware],
});
const persistor = persistStore(store);
sagaMiddleware.run(sagas);

export {persistor, store};
