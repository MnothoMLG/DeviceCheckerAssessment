import {StatusBar} from 'react-native';
/**
 * React Native App
 * Everthing starts from the App
 */
import React, {useEffect, useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import AuthedNav from './navigation/NavigationStack';
import {store} from './redux/root.store';
import AuthStackNav from './navigation/AuthStackNavigator';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {MenuProvider} from 'react-native-popup-menu';
import {Center} from './components/layout/layout';
import {
  login,
  profileCompleted,
  profileIncomplete,
  updateProfile,
} from './redux/modules/auth/actions';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ToastComponet from './components/Toast';
import {storeContacts} from './redux/modules/contacts/actions';
import {endLoading} from './redux/modules/loading/actions';
import strings from './constants/strings';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

console.disableYellowBox = true;

const usersCollection = firestore().collection('users');

const Entry = () => {
  const {authReducer, loadingReducer} = useSelector(state => state);
  const {loading} = loadingReducer;
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    if (user) {
      const number = user.phoneNumber;
      usersCollection.doc(number || '').onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists && documentSnapshot.data().name) {
          const {
            message = strings.defaultAlertMsg,
            contacts = [],
            name,
          } = documentSnapshot.data() as any;
          dispatch(updateProfile({number, name, message}));
          dispatch(storeContacts(contacts));
          dispatch(profileCompleted());
        } else {
          dispatch(updateProfile({number, name: ''}));
          dispatch(profileIncomplete());
        }
        dispatch(endLoading());
      });
      dispatch(login());
    }
    if (initializing) {
      setTimeout(() => setInitializing(false), 1000);
    }
  }

  const locationAlert = () =>
    Alert.alert(
      'Location',
      "Please go allow the app to use the location in your device settings.\nOnce that's done, restar your app",
      [{text: 'OK', onPress: () => {}}],
    );
  useEffect(() => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          locationAlert();
          break;
        case RESULTS.DENIED:
          locationAlert();
          break;
        case RESULTS.LIMITED:
          locationAlert();
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          locationAlert();
          break;
      }
    });

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
      <ToastComponet />
      <StatusBar backgroundColor={'#EC131C'} barStyle="dark-content">
        {' '}
      </StatusBar>
      {!authReducer.loggedIn ? <AuthStackNav /> : <AuthedNav />}
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
