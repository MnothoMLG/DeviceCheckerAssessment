/**
 * React Native App
 * Everything starts from the Entry-point
 */
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import RootNavigation from './src/navigation';
import {store} from './src/store/root.store';

const EntryPoint: React.FC = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={<ActivityIndicator />} > */}
      <RootNavigation />
      {/* </PersistGate> */}
    </Provider>
  );
};

export default EntryPoint;
