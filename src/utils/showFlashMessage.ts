import {showMessage} from 'react-native-flash-message';
import {colors} from '../theme';

const flashMessage = (description: string) => {
  showMessage({
    message: 'Bingo',
    description,
    type: 'info',
    duration: 3000,
    color: colors.typography.static,
    backgroundColor: colors.background.primary,
  });
};

export default flashMessage;
