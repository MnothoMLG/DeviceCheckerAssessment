import {StyleSheet} from 'react-native';
import {colors} from '../../../theme';

const styles = StyleSheet.create({
  topBar: {
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    height: 64,
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 24,
    flexDirection: 'row',
    shadowOffset: {height: 10, width: 0},
  },
  backBtnStyle: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
