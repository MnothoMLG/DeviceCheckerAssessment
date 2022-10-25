import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {AlertPopUp} from './src/components/alertPopUp';
import LoadingOverlay from './src/components/loader';
import RootNavigation from './src/navigation';
import {persistor, store} from './src/store/root.store';

const EntryPoint: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<ActivityIndicator />}>
        <LoadingOverlay />
        <AlertPopUp />
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
};

export default EntryPoint;
