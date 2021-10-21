import {Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');

const iPhoneLarge = Platform.OS === 'ios' && height >= 736;
const smalleriPhone = height <= 667;
export {height, width, smalleriPhone, iPhoneLarge};

// FIXME: Move this to the Metrics file
