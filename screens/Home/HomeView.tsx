//import liraries
import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, TouchableOpacity, Text, Modal} from 'react-native';
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
import {storeContacts} from '../../redux/modules/contacts/actions';
import {startLoading, endLoading} from '../../redux/modules/loading/actions';
import Geolocation from '@react-native-community/geolocation';
import flashMessage from '../../utils/showFlashMessage';
import styles from './styles';
const usersCollection = firestore().collection('users');

// create a component
const HomeScreen = () => {
  const [showEmergency, setShow] = useState(false);
  const [touches, setTouches] = useState<number>(1);
  const [latLng, setLatLng] = useState<string>('');
  const [profileVisible, showProfile] = useState(false);
  const {profile} = useSelector(state => ({
    profile: state.authReducer.profile,
    contacts: state.contactsReducer.contacts,
  }));
  const nums = ['+27680189220', '+27 67 218 8754']; //contacts.map(c => c.number);
  const {number} = profile;
  const dispatch = useDispatch();

  const updateUserProfile = (name: string) => {
    //call update profileaction
    dispatch(startLoading());
    usersCollection
      .doc(number)
      .set({name})
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
    // dispatch(startLoading());
    const {message} = profile;
    const text = '. Here is my location \n';
    const mapLink = `http://www.google.com/maps/place/${latLng}`;

    sendSMS({
      msg: message + text + mapLink,
      emergencyContacts: nums,
    });
    // setTimeout(() => dispatch(endLoading()), 2000);
  };

  const flagSafety = () => {
    // dispatch(startLoading());
    setShow(false);
    sendSMS({
      msg: 'Worry not, I have been attended to and am safe.',
      emergencyContacts: nums,
    });

    // setTimeout(() => dispatch(endLoading()), 2000);
  };

  useEffect(() => {
    dispatch(startLoading());
    usersCollection.doc(number).onSnapshot(documentSnapshot => {
      if (documentSnapshot.exists) {
        const {message, contacts, name} = documentSnapshot.data() as any;
        dispatch(updateProfile({...profile, name, message}));
        dispatch(storeContacts(contacts));
      } else {
        showProfile(true);
      }
      dispatch(endLoading());
    });
    Geolocation.getCurrentPosition(
      pos => {
        const {
          coords: {latitude, longitude},
        } = pos;
        setLatLng(`${latitude},${longitude}`);
      },
      err => {
        console.log(' had an error here', {err});
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
      },
    );
  }, []);

  return [
    <SafeAreaView style={{backgroundColor: Colors.white}} />,
    <Modal animationType="slide" visible={profileVisible}>
      <AddProfile
        closeModal={() => showProfile(false)}
        updateProfile={updateUserProfile}
      />
    </Modal>,
    <EmergencyCalling onSafe={() => flagSafety()} visible={showEmergency} />,
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
