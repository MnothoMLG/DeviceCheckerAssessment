import {StatusBar} from 'react-native';
/**
 * React Native App
 * Everthing starts from the App
 */
import React, {useEffect, useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import Home from './navigation/NavigationStack';
import {store} from './redux/root.store';
import AuthStackNav from './navigation/AuthStackNavigator';
import auth from '@react-native-firebase/auth';
import {MenuProvider} from 'react-native-popup-menu';
import {Center} from './components/layout/layout';
import {login} from './redux/modules/auth/actions';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
console.disableYellowBox = true;

const Entry = () => {
  const {authReducer, loadingReducer} = useSelector(state => state);
  const {loading} = loadingReducer;
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (user) {
      dispatch(login());
    }
    if (initializing) {
      setTimeout(() => setInitializing(false), 1000);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <Center style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LoadingSpinner visible />
      </Center>
    );
  }
  return (
    <>
      <LoadingSpinner visible={loading} />
      <StatusBar backgroundColor={'#EC131C'} barStyle="dark-content">
        {' '}
      </StatusBar>
      {!authReducer.loggedIn && false ? <AuthStackNav /> : <Home />}
    </>
  );
};

const App = () => (
  <Provider store={store}>
    <MenuProvider>
      <Entry />
    </MenuProvider>
  </Provider>
);

export default App;
