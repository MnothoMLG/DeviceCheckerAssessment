import {customStyles, OutterWrapper} from './styles';
import {useLoading} from '../../hooks/useLoadingHook';
import {LOGIN_LOADING_KEY} from '../../store/auth/actions';
import {ActivityIndicator} from 'react-native-paper';
import React from 'react';
import {Modal, Text} from 'react-native';

export function LoadingOverlay() {
  const isOpen = useLoading(LOGIN_LOADING_KEY);

  return (
    <Modal visible={isOpen} style={customStyles}>
      <OutterWrapper>
        <ActivityIndicator />
        <Text>Please wait</Text>
      </OutterWrapper>
    </Modal>
  );
}
export default LoadingOverlay;
