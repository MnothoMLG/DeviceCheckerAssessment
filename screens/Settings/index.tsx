import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {ScrollView, SafeAreaView, TouchableOpacity, View} from 'react-native';
// import {Icon} from 'react-native-paper';
import {Text} from '../../components';
import {Fonts} from '../../constants';
import {Colors} from '../../constants';
import icons from '../../assets/icons';
import PhoneIcon from '../../assets/icons/PhoneIcon';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../../assets/icons/BackIcon';
import {logout} from '../../redux/modules/auth/actions';

const Settings = () => {
  const navigation = useNavigation();

  const renderUserDetails = () => (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderBottomColor: Colors.overlayDark10,
        borderBottomWidth: 10,
      }}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: 'grey',
        }}
      />
      <View style={{paddingHorizontal: 16, justifyContent: 'center'}}>
        <Text color={Colors.overlayDark40}>Sifiso </Text>
        <View style={{height: 20, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity>
            <Text font={Fonts.tinyBold} color={Colors.secondayGreen}>
              View Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderMenuOpt = option => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (option.displayName === 'Logout') {
            dispatch(logout());
            return;
          }
          navigation.navigate(option.route);
        }}>
        <View
          style={{
            height: 60,
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            borderBottomColor: Colors.overlayDark20,
            borderBottomWidth: 1,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {option.icon}
            <Text ml={2}>{option.displayName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      {renderUserDetails()}
      <ScrollView>
        <View style={{fle: 1, height: 500}}>
          <View style={{flex: 1, paddingHorizontal: 20}}>
            {menuList.map(item => renderMenuOpt(item))}
          </View>

          <View style={{position: 'absolute', bottom: 16, width: '100%'}}>
            {renderMenuOpt({displayName: 'Logout', icon: <BackIcon />})}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const menuList = [
  {
    displayName: 'Contacts',
    icon: <PhoneIcon />,
    route: 'ContactList',
  },
  {
    displayName: 'Alert Settings',
    icon: <icons.InfoIcon />,
    route: 'AlertSettings',
  },
  {displayName: 'Help', icon: <icons.HelpIcon />, route: 'ContactList'},
];

export default Settings;

// FIXME: Remove unused code and imports
