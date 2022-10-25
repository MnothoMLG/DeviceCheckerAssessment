import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import {StatusBar} from 'react-native';

const Stack = createStackNavigator();
const SignedInStack = createStackNavigator();

const navOptions = {
  header: () => null,
};

const HomeStack = () => (
  <SignedInStack.Navigator>
    <Stack.Screen name="Home" component={Home} options={navOptions} />
  </SignedInStack.Navigator>
);

const RootNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="SignedIn"
          component={HomeStack}
          options={navOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
