import React from 'react';
import Search from '../screens/Search';
import Home from '../screens/Home/HomeView';
import ProductList from '../screens/ContactList';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeIcon from '../assets/icons/HomeIcon';
import SearchIcon from '../assets/icons/SearchIcon';
import {Colors} from '../constants';
import EditHeader from '../components/header/EditHeader';
import EmergencyCalling from '../screens/EmergencyCalling';
import Settings from '../screens/Settings';
import ContactList from '../screens/ContactList';
import AlertSettings from '../screens/AlertSettings';
import PhoneIcon from '../assets/icons/PhoneIcon';
import HelpIcon from '../assets/icons/HelpIcon';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        options={{
          header: () => <EditHeader header={'headerTitle'} />,
        }}
        name="ProductList"
        component={ProductList}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        options={{
          header: () => <EditHeader header={'Contacts'} />,
        }}
        name="ContactList"
        component={ContactList}
      />
      <Stack.Screen
        options={{
          header: () => <EditHeader header={'Alert Settings'} />,
        }}
        name="AlertSettings"
        component={AlertSettings}
      />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#FF2D55',
          tabBarInactiveTintColor: Colors.overlayDark50,
        }}
        initialRouteName="Home">
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <HomeIcon fill={focused ? '#FF2D55' : Colors.overlayDark50} />
            ),
            header: () => null,
          }}
          name="Home"
          component={HomeStack}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <HelpIcon fill={focused ? '#FF2D55' : Colors.overlayDark50} />
            ),
            header: () => null,
          }}
          name="Settings"
          component={SettingsStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;
