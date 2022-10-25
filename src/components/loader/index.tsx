import styles from './styles';
import {useLoading} from '../../hooks/useLoadingHook';
import {FETCH_ALL_LOADING_KEY} from '../../store/data/actions';
import {ActivityIndicator} from 'react-native-paper';
import React from 'react';
import {Modal, View} from 'react-native';
import {Margin} from '../layout/layout';
import {Text} from '..';
import strings from '../../constants/strings';

export function LoadingOverlay() {
  const isOpen = useLoading(FETCH_ALL_LOADING_KEY);

  return (
    <Modal transparent style={styles.span} visible={isOpen}>
      <View style={styles.modal}>
        <ActivityIndicator size="large" />
        <Margin mt={40} />
        <Text>{strings.wait}</Text>
      </View>
    </Modal>
  );
}
export default LoadingOverlay;
