import React from 'react';
import {Text, View} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import styles from './styles';

const ToastComponet: React.FC = () => {
  return (
    <FlashMessage
      duration={2500}
      MessageComponent={({message: {description, backgroundColor, color}}) => {
        return (
          <View style={[styles.wrapper, {backgroundColor}]}>
            <Text style={[styles.description, {color}]}>{description}</Text>
          </View>
        );
      }}
      position="top"
    />
  );
};

export default ToastComponet;
