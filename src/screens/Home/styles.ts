import {StyleSheet} from 'react-native';
import {colors} from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 48,
    alignItems: 'center',
    backgroundColor: colors.background.bgDark,
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
  },
});

export default styles;
