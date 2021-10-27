//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import images from '../../assets/images';
import {Image} from '../../components';
import {Margin} from '../../components/layout/layout';
import {Colors, shadow} from '../../constants';
import sendSMS from '../../utils/sendAlert';
import EmergencyCalling from '../EmergencyCalling';
import firestore from '@react-native-firebase/firestore';
import AddProfile from './AddProfile';
import {updateProfile} from '../../redux/modules/auth/actions';
import {useDispatch, useSelector} from 'react-redux';
import {storeContacts} from '../../redux/modules/contacts/actions';
import {startLoading, endLoading} from '../../redux/modules/loading/actions';
const usersCollection = firestore().collection('users');

// create a component
const HomeScreen = () => {
  const [showEmergency, setShow] = useState(false);
  const [touches, setTouches] = useState(0);
  const [profileVisible, showProfile] = useState(false);
  const {profile, contacts} = useSelector(state => ({
    profile: state.authReducer.profile,
    contacts: state.contactsReducer.contacts,
  }));
  const {number} = profile;
  const dispatch = useDispatch();

  const updateUserProfile = (name: string) => {
    //call update profileaction
    dispatch(startLoading());
    usersCollection
      .doc(number)
      .set({name})
      .then(() => {
        //show success flash message
        dispatch(updateProfile({...profile, name}));
      })
      .finally(() => dispatch(endLoading()));
  };

  const fireAlert = () => {
    dispatch(startLoading());
    console.log('here sre the contacts ', contacts);
    const nums = ['+27680189220', '+27 67 218 8754']; //contacts.map(c => c.number);
    const {message, name} = profile;
    const latLng = '-28.868282027545053,31.9080245739612'; //`${lat},${lng}`;
    const text = '. Here is my location \n';
    const androidCoords = `http://www.google.com/maps/place/${latLng}`; //`http://maps.google.com/?q=${latLng}` //`comgooglemaps://?q=${latLng}`;
    // body: `http://www.google.com/maps/place/${latLng}` //'maps:0,0?q=-28.868282027545053,31.9080245739612',

    // =====
    sendSMS({
      msg: message + text + androidCoords,
      emergencyContacts: nums,
    });
    dispatch(endLoading());
  };

  useEffect(() => {
    usersCollection.doc(number).onSnapshot(documentSnapshot => {
      if (documentSnapshot.exists) {
        const {message, contacts, name} = documentSnapshot.data() as any;
        dispatch(updateProfile({...profile, name, message}));
        dispatch(storeContacts(contacts));
      } else {
        showProfile(true);
      }
    });
  }, []);

  return [
    <SafeAreaView style={{backgroundColor: Colors.white}} />,
    <Modal animationType="slide" visible={profileVisible}>
      <AddProfile
        closeModal={() => showProfile(false)}
        updateProfile={updateUserProfile}
      />
    </Modal>,
    <EmergencyCalling onSafe={() => setShow(false)} visible={showEmergency} />,
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          // setTouches(prevState => prevState + 1);
          fireAlert();
          console.log({touches});
          // if (touches >= 3) {
          //   setShow(true);
          //   setTouches(0);
          //   fireAlert();
          // }
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
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  panic: {
    width: 200,
    height: 200,
    borderWidth: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FF2D55',
    borderRadius: 100,
  },
  categoriesList: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 140,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  top: {
    backgroundColor: Colors.white,
    height: 100,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  listing: {
    backgroundColor: Colors.white,
    borderRadius: 22,
    paddingTop: 18,
    paddingBottom: 42,
    marginBottom: 16,
    ...shadow,
  },
  description: {
    height: 42,
    paddingHorizontal: 12,
    borderRadius: 20,
    color: 'rgba(0,0,0,0.7)',
    textAlign: 'center',
  },
  popularCategories: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: 110,
    height: 110,
    marginRight: 12,
  },
  popularText: {marginTop: 8, fontSize: 13, fontWeight: 'bold'},
});

export default HomeScreen;
