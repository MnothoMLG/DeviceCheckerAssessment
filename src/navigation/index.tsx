import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import Home from '../screens/Home';
import DeviceCheck from '../screens/PlatformCheck';
import Welcome from '../screens/Welcome';
import {StatusBar} from 'react-native';
import {ILoginState} from '../models/reducers/login';
import {getAuthState} from '../store/auth/selectors';

const Stack = createStackNavigator();
const SignedOutStack = createStackNavigator();
const SignedInStack = createStackNavigator();

const navOptions = {
  header: () => null,
};

interface IState {
  loginReducer: ILoginState;
}

const SignedOutNavigator = () => {
  const {loggedIn} = useSelector(getAuthState);
  return (
    <SignedOutStack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={navOptions}
      />
    </SignedOutStack.Navigator>
  );
};

const SignedInNavigator = () => (
  <SignedInStack.Navigator>
    <Stack.Screen name="Home" component={Home} options={navOptions} />
    <Stack.Screen name="DeviceCheck"  options={navOptions} component={DeviceCheck} />
  </SignedInStack.Navigator>
);

const RootNavigation: React.FC = () => {
  const {loggedIn} = useSelector(getAuthState);

  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator headerMode="none">
        {loggedIn ? (
          <Stack.Screen
            name="SignedIn"
            component={SignedInNavigator}
            options={navOptions}
          />
        ) : (
          <Stack.Screen
            name="SignedOut"
            component={SignedOutNavigator}
            options={navOptions}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
