import {StatusBar} from 'react-native';
/**
 * React Native App
 * Everthing starts from the App
 */
import React from 'react';
import {Provider, useSelector} from 'react-redux';
import Home from './navigation/NavigationStack';
import {store} from './redux/root.store';
import AuthStackNav from './navigation/AuthStackNavigator';

console.disableYellowBox = true;

const Entry = () => {
  const auth = useSelector(state => state.authReducer);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={'#EC131C'}
        barStyle="dark-content">
        {' '}
      </StatusBar>
      {!auth.loggedIn ? <AuthStackNav /> : <Home />}
    </>
  );
};

const App = () => (
  <Provider store={store}>
    <Entry />
  </Provider>
);

export default App;
