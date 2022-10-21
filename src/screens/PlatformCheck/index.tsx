import React, {useEffect, useState} from 'react';
import {AppButton, Margin, Padding, Text} from '../../components';
import {Alert, NativeModules} from 'react-native';

const {PlatformCheckModule} = NativeModules;

import styles from './styles';
import flashMessage from '../../utils/showFlashMessage';
import {useSelector} from 'react-redux';
import {getAuthState} from '../../store/auth/selectors';
import Greeting from '../../components/greetingHeader';
import HeaderWrapper from '../../components/layout/back-screen';
import strings from '../../constants/strings';
import {string} from 'yup/lib/locale';

const PlatformCheck: React.FC = () => {
  const [device, setDevice] = useState<string>('');
  useEffect(() => {
    PlatformCheckModule.getDeviceType((type: string) => {
      console.log(' Device type ', {type});

      setDevice(type);
    });
  });

  return (
    <HeaderWrapper onBackPress={() => {}} title={strings.platformCheck}>
      <Padding pl={24} pr={24} style={styles.container}>
        <Greeting />
        <Text>{strings.findOut}</Text>
        <Margin mb={36} />
        <AppButton
          fullWidth
          variant="light"
          disabled={false}
          onPress={() => {
            Alert.alert('Bingo', strings.deviceType.replace('{0}', device));
          }}
          rounded
          textSize={14}
          label={strings.clickHere}
        />
      </Padding>
    </HeaderWrapper>
  );
};

export default PlatformCheck;
