import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

export default function Button({
  children,
  disabled,
  onPress,
}: any): React.ReactElement {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.button}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 42,
    backgroundColor: 'red',
  },
});
