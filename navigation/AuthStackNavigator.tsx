/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';

const AuthStack = createStackNavigator();

const AuthStackNav = () => (
  <NavigationContainer>
    <AuthStack.Navigator headerMode="none" initialRouteName={'SignInScreen'}>
      <AuthStack.Screen name="SignInScreen" component={LoginScreen} />
    </AuthStack.Navigator>
  </NavigationContainer>
);

export default AuthStackNav;
