import React, {useEffect, useState} from 'react';
import {AppButton, Margin, Padding, Text} from '../../components';
import {Alert, NativeModules} from 'react-native';

const {PlatformCheckModule} = NativeModules;

import styles from './styles';
import Greeting from '../../components/greetingHeader';
import HeaderWrapper from '../../components/layout/back-screen';
import strings from '../../constants/strings';

//Seems like there isn't a wy of telling if it's an emulator or simulator, but rather the OS/phone

const PlatformCheck: React.FC = () => {
  const [device, setDevice] = useState<string>('');
  const [emulator, setIsEmulator] = useState<boolean>(false);
  useEffect(() => {
    PlatformCheckModule.getDeviceType((type: string) => {
      setDevice(type);
      setIsEmulator(!type?.includes('iPhone'));
    });
  });

  return (
    <HeaderWrapper title={strings.platformCheck}>
      <Padding pl={24} pr={24} style={styles.container}>
        <Greeting />
        <Text>{strings.findOut}</Text>
        <Margin mb={36} />
        <AppButton
          fullWidth
          variant="light"
          disabled={false}
          onPress={() => {
            Alert.alert(
              'Bingo',
              `${strings.deviceType.replace('{0}', device)} \n And that's ${
                emulator ? 'an emulator' : 'a simulator'
              }`,
            );
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
