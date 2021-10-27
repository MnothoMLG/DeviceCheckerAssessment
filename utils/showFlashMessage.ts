import Colors from '../constants/colors';
import {showMessage} from 'react-native-flash-message';

const flashMessage = (type: 'success' | 'danger', description: string) => {
  showMessage({
    message: type === 'success' ? 'success' : 'Error',
    description,
    type,
    duration: 3000,
    color: Colors.white,
    backgroundColor:
      type === 'success' ? Colors.secondayGreen : Colors.romansRed,
  });
};

export default flashMessage;
