import React from 'react';
import {AppButton, Margin, Padding, Text} from '../../components';
import {NativeModules} from 'react-native';

const {PlatformCheckModule} = NativeModules;

import styles from './styles';

const PlatformCheck: React.FC = () => {
  PlatformCheckModule.getDeviceType((type: String) => {
    console.log(' Device type ', {type});
  });

  return (
    <Padding pl={24} pr={24} style={styles.container}>
      <Text>To find out more about your plaform, click below</Text>
      <Margin mb={36} />
      <AppButton
        fullWidth
        variant="light"
        disabled={false}
        onPress={() => {}}
        rounded
        textSize={14}
        label={'Click Here'}
      />
    </Padding>
  );
};

export default PlatformCheck;
