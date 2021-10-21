import {StyleSheet} from 'react-native';
import {Colors, shadow} from '../../constants';
const styles = StyleSheet.create({
  itemInfo: {
    paddingVertical: 8,
    height: '100%',
    justifyContent: 'space-between',
  },
  left: {
    marginRight: 8,
  },
  container: {
    width: '100%',
    height: 72,
    backgroundColor: Colors.white,
    ...shadow,
    shadowOffset: {
      height: 10,
    },
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginHorizontal: 10,
    marginBottom: 16,
    borderRadius: 5,
    paddingVertical: 10,
    alignSelf: 'center',
  },
});

export default styles;
