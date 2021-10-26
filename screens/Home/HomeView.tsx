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
const usersCollection = firestore().collection('users');

// create a component
const HomeScreen = () => {
  const [showEmergency, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileVisible, showProfile] = useState(false);
  const profile = useSelector(state => state.authReducer.profile);
  const {number} = profile;
  const dispatch = useDispatch();

  const updateUserProfile = (name: string) => {
    //call update profileaction

    usersCollection
      .doc(number)
      .set({name})
      .then(() => {
        //show success flash message
        dispatch(updateProfile({...profile, name}));
      });
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

    usersCollection.get().then(querySnapshot => {
      console.log('Total users: ', querySnapshot.size);

      querySnapshot.forEach(documentSnapshot => {
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
    });
  });

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
          sendSMS({
            msg: 'this is a message from the front end',
            emergencyContacts: ['none'],
            number: '1',
          });

          // setShow(true);
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
          Your contacts and your organization will see your request for help
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
