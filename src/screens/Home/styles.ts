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
  swipeContainer: {
    borderRadius: 8,
    backgroundColor: colors.background.trailYellow,
    padding: 0,
    width: '100%',
    alignSelf: 'center',
  },
  thumbIconStyles: {
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: colors.background.primary,
  },
  railStyles: {
    borderRadius: 0,
    borderWidth: 0,
  },
});

export default styles;
