/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OTPScreen from '../screens/AuthScreens/OTPScreen';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import RegistrationScreen from '../screens/AuthScreens/RegistrationScreen';
import {NavigationContainer} from '@react-navigation/native';

const AuthStack = createStackNavigator();

const AuthStackNav = () => (
  <NavigationContainer>
    <AuthStack.Navigator headerMode="none" initialRouteName={'SignInScreen'}>
      <AuthStack.Screen name="SignInScreen" component={LoginScreen} />
      <AuthStack.Screen name="SignUpScreen" component={RegistrationScreen} />
      <AuthStack.Screen name="OTPScreen" component={OTPScreen} />
    </AuthStack.Navigator>
  </NavigationContainer>
);

export default AuthStackNav;
