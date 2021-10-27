import functions from '@react-native-firebase/functions';

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
  pushSMS({data: '~This is test data ', msg, emergencyContacts})
    .then(response => {
      console.log('results here  ====', {response});
    })
    .catch(err => {
      console.log({err});
    });
};

export default sendSMS;
