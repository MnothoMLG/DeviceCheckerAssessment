import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {AppButton, Margin, Padding, Text} from '../../components';
import {getAuthState} from '../../store/auth/selectors';
import SwipeButton from 'rn-swipe-button';
import styles from './styles';
import {colors} from '../../theme';

const Home: React.FC = () => {
  const onLogout = () => {}; //dispatch(loginActions.logOut());
  const {name} = useSelector(getAuthState);
  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={{padding: 5}}>{`Hey, ${name}`}</Text>
      <Margin mb={56} />
      <Padding pl={24} pr={24} style={{width: '100%'}}>
        <AppButton
          fullWidth
          variant="clear"
          disabled={false}
          onPress={() => {}}
          rounded
          textSize={14}
          label={'Clear Button'}
        />
        <Margin mb={12} />
        <AppButton
          fullWidth
          variant="dark"
          disabled={false}
          onPress={() => {}}
          textSize={14}
          rounded
          label={'Secondary'}
        />
        <Margin mb={12} />
        <AppButton
          fullWidth
          variant="light"
          disabled={false}
          onPress={() => {
            navigate('DeviceCheck');
          }}
          textSize={14}
          rounded
          label={'Primary'}
        />
        <Margin mb={12} />
        <SwipeButton
          height={52}
          shouldResetAfterSuccess
          onSwipeSuccess={() => {
            navigate('DeviceCheck');
          }}
          containerStyles={styles.swipeContainer}
          railBackgroundColor={colors.background.bgDark}
          thumbIconStyles={styles.thumbIconStyles}
          titleColor={colors.background.primary}
          titleFontSize={14}
          railBorderColor={colors.background.secondary}
          thumbIconBackgroundColor={colors.background.transparent}
          thumbIconBorderColor="rgba(0, 0, 0, 0)"
          railStyles={styles.railStyles}
          thumbIconComponent={() => (
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: colors.background.primary,
                borderRadius: 8,
              }}
            />
          )}
          thumbIconWidth={56}
          title={'Slide me to continue'}
        />
      </Padding>
    </View>
  );
};

export default Home;
