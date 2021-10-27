import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');
import Colors from '../../constants/colors';
import {ifIphoneX} from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    width: width - 48,
    alignSelf: 'center',
    padding: 16,
    borderRadius: 5,
    ...ifIphoneX(
      {
        position: 'absolute',
        top: 40,
      },
      {},
    ),
  },
  description: {
    color: Colors.overlayDark90,
  },
  message: {
    color: Colors.overlayDark90,
  },
});
