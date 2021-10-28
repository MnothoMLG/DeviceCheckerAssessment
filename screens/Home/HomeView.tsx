//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Modal,
  Alert,
} from 'react-native';
import images from '../../assets/images';
import {Image} from '../../components';
import {Margin} from '../../components/layout/layout';
import {Colors} from '../../constants';
import sendSMS from '../../utils/sendAlert';
import EmergencyCalling from '../EmergencyCalling';
import firestore from '@react-native-firebase/firestore';
import AddProfile from './AddProfile';
import {updateProfile} from '../../redux/modules/auth/actions';
import {useDispatch, useSelector} from 'react-redux';
import {startLoading, endLoading} from '../../redux/modules/loading/actions';
import Geolocation from '@react-native-community/geolocation';
import flashMessage from '../../utils/showFlashMessage';
import styles from './styles';
// import {loadingDataDone} from '../../actions/appActions';
const usersCollection = firestore().collection('users');

// create a component
const HomeScreen = () => {
  const [showEmergency, setShow] = useState(false);
  const [touches, setTouches] = useState<number>(1);
  const [latLng, setLatLng] = useState<string>('');
  const {profile, contacts, profileComplete} = useSelector(state => ({
    profile: state.authReducer.profile,
    profileComplete: state.authReducer.profileComplete,
    contacts: state.contactsReducer.contacts,
  }));

  const state = useSelector(state => state);

  console.log({state, contacts});
  const nums = contacts.map(c => c.number);
  const {number, name, message} = profile;
  const dispatch = useDispatch();

  const updateUserProfile = (name: string) => {
    dispatch(startLoading());
    usersCollection
      .doc(number)
      .set({name, message})
      .then(() => {
        dispatch(updateProfile({...profile, name}));
        flashMessage('success', 'Profile updated');
      })
      .catch(() => {
        flashMessage('danger', 'An error occured');
      })
      .finally(() => setTimeout(() => dispatch(endLoading()), 2000));
  };

  const fireAlert = () => {
    const {message} = profile;
    const text = '. Here is my location \n';
    const mapLink = `http://www.google.com/maps/place/${latLng}`;

    sendSMS({
      msg: message + text + mapLink,
      emergencyContacts: nums,
    });
    setTimeout(() => flashMessage('success', 'Alert sent'));
  };

  const flagSafety = () => {
    setShow(false);
    sendSMS({
      msg: `Worry not, I have been attended to and am safe. PS, ${name}`,
      emergencyContacts: nums,
    });
    setTimeout(() => flashMessage('success', 'Alert sent'));
  };

  const locationAlert = () =>
    Alert.alert(
      'Location',
      "Please go allow the app to use the location in your device settings.\nOnce that's done, restar your app",
      [{text: 'OK', onPress: () => {}}],
    );

  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        const {
          coords: {latitude, longitude},
        } = pos;
        setLatLng(`${latitude},${longitude}`);
      },
      err => {
        console.log(' had an error here', {err});
        locationAlert();
      },
    );

    Geolocation.watchPosition(
      pos => {
        const {
          coords: {latitude, longitude},
        } = pos;
        setLatLng(`${latitude},${longitude}`);
      },
      () => {
        console.log('some error occured');
        locationAlert();
      },
    );
  }, []);

  return [
    <EmergencyCalling onSafe={() => flagSafety()} visible={showEmergency} />,
    <SafeAreaView
      style={{backgroundColor: showEmergency ? '#FF2D55' : Colors.white}}
    />,
    <Modal animationType="slide" visible={!profileComplete}>
      <AddProfile closeModal={() => {}} updateProfile={updateUserProfile} />
    </Modal>,
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setTouches(touches + 1);
          if (touches >= 3) {
            setShow(true);
            setTouches(1);
            fireAlert();
          }
        }}
        style={styles.panic}>
        <Image source={images.point} width={30} height={30} />
      </TouchableOpacity>
      <Margin marginTop={42} />
      <Text style={{fontWeight: 'bold', fontSize: 17}}>
        Tap button 3 times to alert
      </Text>

      <Margin marginTop={22}>
        <Text style={styles.description}>
          {' '}
          Your contacts will see your request for help
        </Text>
      </Margin>
    </View>,
  ];
};

// define your styles

export default HomeScreen;
