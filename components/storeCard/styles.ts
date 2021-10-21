import {StyleSheet} from 'react-native';
import {Colors, shadow} from '../../constants';
const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    height: 202,
    backgroundColor: '#fff',
    margin: 10,
    ...shadow,
  },
  ratingWrapper: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgSection: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 130,
    width: '100%',
    backgroundColor: Colors.textGrey,
  },
  offer: {
    position: 'absolute',
    height: 22,
    width: 62,
    backgroundColor: Colors.romansRed,
    left: 20,
    bottom: 20,
    borderRadius: 4,
  },
  details: {
    height: 72,
    width: '100%',
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default styles;
