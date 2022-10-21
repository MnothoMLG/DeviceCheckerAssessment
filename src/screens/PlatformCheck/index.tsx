import React, {useEffect, useState} from 'react';
import {AppButton, Margin, Padding, Text} from '../../components';
import {Alert, NativeModules} from 'react-native';

const {PlatformCheckModule} = NativeModules;

import styles from './styles';
import flashMessage from '../../utils/showFlashMessage';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../store/auth/selectors';
import Greeting from '../../components/greetingHeader';

const PlatformCheck: React.FC = () => {
  const [device, setDevice] = useState<string>('');
  useEffect(() => {
    PlatformCheckModule.getDeviceType((type: string) => {
      console.log(' Device type ', {type});

      setDevice(type);
    });
  });

  return (
    <Padding pl={24} pr={24} style={styles.container}>
      <Greeting />
      <Text>To find out more about your plaform, click below</Text>
      <Margin mb={36} />
      <AppButton
        fullWidth
        variant="light"
        disabled={false}
        onPress={() => {
          flashMessage(`Your device type is '+ ${device}`);
          Alert.alert('Bingo', `Your device type is '+ ${device}`);
        }}
        rounded
        textSize={14}
        label={'Click Here'}
      />
    </Padding>
  );
};

export default PlatformCheck;
