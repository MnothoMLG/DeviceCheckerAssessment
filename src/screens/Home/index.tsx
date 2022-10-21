import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Alert, View} from 'react-native';
import {AppButton, Margin, Padding} from '../../components';
import SwipeButton from 'rn-swipe-button';
import styles from './styles';
import {colors} from '../../theme';
import Greeting from '../../components/greetingHeader';
import DiamondIcon from '../../assets/icons/diamond.svg';
import {useDispatch} from 'react-redux';
import {logoutRequest} from '../../store/auth/actions';
import strings from '../../constants/strings';
import routes from '../../navigation/routes';

const Home: React.FC = () => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Margin mt={48} />
      <Greeting />
      <Margin mb={56} />
      <Padding pl={24} pr={24} style={styles.span}>
        <AppButton
          fullWidth
          variant="clear"
          disabled={false}
          onPress={() => {}}
          rounded
          textSize={14}
          label={strings.clearBtn}
        />
        <Margin mb={12} />
        <AppButton
          fullWidth
          variant="dark"
          disabled={false}
          onPress={() => {}}
          textSize={14}
          rounded
          label={strings.secondary}
        />
        <Margin mb={12} />
        <AppButton
          fullWidth
          variant="light"
          disabled={false}
          onPress={() => {
            Alert.alert(strings.sure, strings.confirmLogOff, [
              {
                text: 'Yes',
                onPress: () => {
                  dispatch(logoutRequest());
                },
              },
              {
                text: 'No',
                onPress: () => {},
              },
            ]);
          }}
          textSize={14}
          rounded
          label={strings.logOff}
        />
        <Margin mb={12} />
        <SwipeButton
          height={52}
          shouldResetAfterSuccess
          onSwipeSuccess={() => {
            navigate(routes.DEVICE_CHECK_SCREEN);
          }}
          containerStyles={styles.swipeContainer}
          railBackgroundColor={colors.background.bgDark}
          thumbIconStyles={styles.thumbIconStyles}
          titleColor={colors.background.primary}
          titleFontSize={14}
          railFillBackgroundColor={colors.background.secondary}
          railBorderColor={colors.background.secondary}
          thumbIconBackgroundColor={colors.background.transparent}
          thumbIconBorderColor="rgba(0, 0, 0, 0)"
          railStyles={styles.railStyles}
          thumbIconComponent={() => (
            <View style={styles.swipeIcon}>
              <DiamondIcon />
            </View>
          )}
          thumbIconWidth={56}
          title={strings.slide}
        />
      </Padding>
    </View>
  );
};

export default Home;
