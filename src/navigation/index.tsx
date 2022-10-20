import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import Buttons from '../screens/Buttons';
import DeviceCheck from '../screens/PlatformCheck';
import Welcome from '../screens/Welcome';
import {StatusBar} from 'react-native';
import {ILoginState} from '../models/reducers/login';
import {getAuthState} from '../store/auth/selectors';

const Stack = createStackNavigator();
const SignedOutStack = createStackNavigator();
const SignedInStack = createStackNavigator();

const homeOptions = {
  title: 'Buttons',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  //   headerRight: () => <ThemeController />,
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
        options={{
          animationTypeForReplace: loggedIn ? 'push' : 'pop',
          //   headerRight: () => <ThemeController />,
        }}
      />
      <Stack.Screen
        name="DeviceCheck"
        component={DeviceCheck}
        options={{
          animationTypeForReplace: loggedIn ? 'push' : 'pop',
          //   headerRight: () => <ThemeController />,
        }}
      />
    </SignedOutStack.Navigator>
  );
};

const SignedInNavigator = () => (
  <SignedInStack.Navigator>
    <Stack.Screen name="Buttons" component={Buttons} options={homeOptions} />
  </SignedInStack.Navigator>
);

const RootNavigation: React.FC = () => {
  const {loggedIn} = useSelector(getAuthState);

  return (
    <NavigationContainer >
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator headerMode="none">
        {loggedIn ? (
          <Stack.Screen
            name="SignedIn"
            component={SignedInNavigator}
            options={homeOptions}
          />
        ) : (
          <Stack.Screen
            name="SignedOut"
            component={SignedOutNavigator}
            options={{
              // When logging out, a pop animation feels intuitive
              animationTypeForReplace: loggedIn ? 'push' : 'pop',
              //   headerRight: () => <ThemeController />,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
