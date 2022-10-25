/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {colors} from '../../theme';
import {Text} from '../text';
import CheckIcon from '../../assets/icons/check.svg';

interface Props extends TouchableOpacityProps {
  active?: boolean;
  height?: number;
  fontSize?: number;
  lineHeight?: number;
  fullWidth?: boolean;
  alterNativeActive?: boolean;
  label: string;
}
export const SelectButton: FC<Props> = ({
  active,
  fontSize,
  lineHeight,
  label,
  children,

  ...props
}) => (
  <TouchableOpacity {...props} style={styles.option}>
    {children}
    <Text
      size={fontSize || 14}
      align="center"
      lh={lineHeight || 20}
      color={active ? colors.background.black : colors.background.secondary}>
      {label}
    </Text>
    {active && (
      <View style={styles.check}>
        <CheckIcon />
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  option: {
    height: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 8,
  },
  check: {
    position: 'absolute',
    right: 16,
  },
  fullWidth: {
    flex: 1,
    justifyContent: 'center',
  },
});
