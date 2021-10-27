import functions from '@react-native-firebase/functions';
import flashMessage from './showFlashMessage';

if (__DEV__) {
  // If you are running on a physical device, replace http://localhost with the local ip of your PC. (http://192.168.x.x)
  functions().useFunctionsEmulator('http://localhost:5001');
}
const pushSMS = functions().httpsCallable('sendAlertSMS');
const sendSMS = ({
  msg,
  emergencyContacts,
}: {
  msg: string;
  emergencyContacts: string[];
}) => {
  pushSMS({msg, emergencyContacts})
    .then(response => {
      console.log('results here  ====', {response});
      flashMessage('success', 'Alert sent.');
    })
    .catch(err => {
      console.log({err});
      // flashMessage('danger', 'An error occured.\nPlease try again');
    });
};

export default sendSMS;
