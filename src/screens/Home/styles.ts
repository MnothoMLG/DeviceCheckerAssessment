import {StyleSheet} from 'react-native';
import {colors} from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: colors.typography.static,
  },
  sort: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  span: {width: '100%'},
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
  },
});

export default styles;
