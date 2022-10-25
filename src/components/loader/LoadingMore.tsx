import {ActivityIndicator} from 'react-native-paper';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Margin} from '../layout/layout';
import {Text} from '..';
import strings from '../../constants/strings';
import {colors} from '../../theme';

export function LoadingMore() {
  return (
    <Margin testId="loading-more" style={styles.container} mb={68} mt={24}>
      <ActivityIndicator />
      <Text mt={4} color={colors.background.bgDark}>
        {strings.loading.more}
      </Text>
    </Margin>
  );
}
export default LoadingMore;

const styles = StyleSheet.create({
  container: {alignItems: 'center'},
});
