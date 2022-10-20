import styles from './styles';
import {useLoading} from '../../hooks/useLoadingHook';
import {LOGIN_LOADING_KEY} from '../../store/auth/actions';
import {ActivityIndicator} from 'react-native-paper';
import React from 'react';
import {Modal, Text, View} from 'react-native';
import {Margin} from '../layout/layout';

export function LoadingOverlay() {
  const isOpen = useLoading(LOGIN_LOADING_KEY);

  return (
    <Modal transparent style={{width: '100%', height: '100%'}} visible={isOpen}>
      <View style={styles.modal}>
        <ActivityIndicator />
        <Margin mt={40} />
        <Text>Please wait</Text>
      </View>
    </Modal>
  );
}
export default LoadingOverlay;
