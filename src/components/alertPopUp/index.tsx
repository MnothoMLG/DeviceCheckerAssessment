import React, {FC} from 'react';
import {Margin, Row, Text, AppButton, Padding} from '../../components';
import {Modal, StyleSheet, View} from 'react-native';
import {colors} from '../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {getAlertState} from '../../store/alert/selectors';
import {closeAlert} from '../../store/alert/actions';

export const AlertPopUp: FC = () => {
  const {title, message, visible, right, left} = useSelector(getAlertState);
  const dispatch = useDispatch();
  const close = () => dispatch(closeAlert());

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <Padding pr={24} pb={24} pt={24} pl={24} style={styles.dialog}>
          <Text color={colors.typography.black} xtraBold size={21} lh={24}>
            {title}
          </Text>

          <Text color={colors.typography.inactive} mb={24} mt={16}>
            {message}
          </Text>
          <Row justify="flex-end">
            {left && (
              <AppButton
                {...left}
                textSize={14}
                onPress={e => {
                  close();
                  left.onPress && left.onPress(e);
                }}
                variant="clear"
                style={styles.button}
              />
            )}
            <Margin mr={8} />
            {right && (
              <AppButton
                {...right}
                textSize={14}
                onPress={e => {
                  close();
                  right.onPress && right.onPress(e);
                }}
                style={styles.button}
              />
            )}
          </Row>
        </Padding>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {height: 40, paddingHorizontal: 12, paddingVertical: 10},
  overlay: {
    flex: 1,
    backgroundColor: `${colors.background.black}D6`,
    width: '100%',
    height: '100%',
    paddingTop: '50%',
    paddingHorizontal: 24,
  },
  dialog: {backgroundColor: colors.typography.static, width: '100%'},
});
