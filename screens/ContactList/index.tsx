import React, {useState} from 'react';
import {
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {Text} from '../../components';
import {Fonts} from '../../constants';
import AddContact from './AddContact';
import ContactCard from '../../components/menuItem';
import styles from './styles';
import {endLoading, startLoading} from '../../redux/modules/loading/actions';
import {addContact} from '../../redux/modules/contacts/actions';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {Contact} from '../../redux/modules/contacts/types';
import {retry} from 'redux-saga/effects';
import {Margin} from '../../components/layout/layout';
import flashMessage from '../../utils/showFlashMessage';
const usersCollection = firestore().collection('users');

const ContactList = props => {
  const [addVisible, setShowAdd] = useState(false);
  const [editing, setEditing] = useState();
  const {contacts, profile} = useSelector(state => ({
    contacts: state.contactsReducer.contacts,
    profile: state.authReducer.profile,
  }));
  const {number, name} = profile;
  const dispatch = useDispatch();
  const renderContacts = () => {
    if (contacts.length === 0) {
      return (
        <Margin style={{paddingHorizontal : 20}}>
          <Text numberOfLines={3} align="center">
            {
              'No contacts here.\nClick add and start saving emergency contact persons'
            }
          </Text>
        </Margin>
      );
    }
    return contacts.map(item => (
      <ContactCard
        onEdit={() => {
          setShowAdd(true);
          setEditing(item);
        }}
        onDelete={() => promptDelete(item)}
        onAdd={() => null}
        item={item}
      />
    ));
  };

  const promptDelete = (byeContact: Contact) => {
    Alert.alert('Delete Contact', 'Are You Sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteContact(byeContact)},
    ]);
  };

  const renderAddButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('adsibfewidoivebewo');
          setShowAdd(true);
        }}
        style={styles.add}>
        <Text font={Fonts.bodyBold} color="#fff">
          Add
        </Text>
      </TouchableOpacity>
    );
  };

  const updateContacts = (
    newContacts: Contact[],
    newContact?: Contact,
    adding?: boolean,
  ) => {
    setShowAdd(false);
    // dispatch(startLoading());
    usersCollection
      .doc(number)
      .update({contacts: newContacts})
      .then(() => {
        if (adding && newContact) {
          dispatch(addContact(newContact));
        }
        flashMessage('success', 'Contacts updated');
      })
      .catch(err => {
        flashMessage('danger', 'An error occured');
      })
      .finally(() => {
        setTimeout(() => dispatch(endLoading()), 2000);
      });
  };

  const deleteContact = (bye: Contact) => {
    const newList = contacts.filter((c: Contact) => c.name !== bye.name);
    updateContacts(newList);
  };

  const renderAddContactModal = () => {
    return (
      <Modal
        animationType="slide"
        onRequestClose={() => {
          setShowAdd(false);
        }}
        visible={addVisible}>
        <AddContact
          editing={editing}
          contact={editing}
          updateContacts={updateContacts}
          closeModal={() => {
            setShowAdd(false);
            setEditing(undefined);
          }}
        />
      </Modal>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}
        style={styles.scrollContainer}>
        {renderAddContactModal()}
        {renderContacts()}
      </ScrollView>
      {renderAddButton()}
    </SafeAreaView>
  );
};

export default ContactList;
