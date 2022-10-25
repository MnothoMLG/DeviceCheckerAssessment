import {StyleSheet} from 'react-native';
import {colors} from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: colors.background.border,
  },
  span: {width: '100%'},
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
  },
  swipeIcon: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: colors.background.primary,
    borderRadius: 8,
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
    padding: 0,
  },
});

export default styles;
