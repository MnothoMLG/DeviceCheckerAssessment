import React, {useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {Margin, Padding, Row} from '../layout/layout';
import {Text} from '..';
import {SelectButton} from '../selectButton';
import {colors} from '../../theme';
import {AppButton} from '../appButton';
import {useDispatch, useSelector} from 'react-redux';
import {getSelectedSort} from '../../store/data/selectors';
import {fetachAllRequest, setSort} from '../../store/data/actions';
import {ISort} from '../../store/data/types';

export function SortModal({
  close,
  visible,
}: {
  close: () => void;
  visible: boolean;
}) {
  const sort = useSelector(getSelectedSort);
  const [selected, setSelected] = useState<ISort>(sort);
  const filters: ISort[] = ['Top', 'New', 'Hot', 'Rising'];
  const dispatch = useDispatch();

  const applySort = () => {
    dispatch(setSort({sort: selected}));
    dispatch(fetachAllRequest({sort: selected}));
    close();
    //call the fetch again
  };

  return (
    <Modal
      animationType="fade"
      transparent
      style={styles.span}
      animated
      visible={visible}>
      <View style={styles.modal}>
        <Margin ml={24} mr={24} overflow="hidden">
          <Padding pl={24} pr={24} pb={24} style={styles.wrapper}>
            <Text
              size={25}
              style={{alignSelf: 'flex-end'}}
              bold
              color={colors.background.bgDark}>
              x
            </Text>
            <Text size={20} bold color={colors.background.bgDark}>
              Sort by
            </Text>
            <Margin mt={40} />
            {filters.map(item => (
              <SelectButton
                active={selected === item}
                onPress={() => setSelected(item)}
                label={item}
              />
            ))}
            <Margin mt={40} />
            <AppButton
              onPress={() => applySort()}
              textSize={13}
              fullWidth
              label="Apply"
            />
          </Padding>
        </Margin>
      </View>
    </Modal>
  );
}
export default SortModal;

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    width: 260,
    borderRadius: 5,
  },
  span: {width: '100%', height: '100%'},
});
