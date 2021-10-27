import React, {useState} from 'react';
import {TouchableOpacity, Modal, SafeAreaView, ScrollView} from 'react-native';
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
    return contacts.map(item => (
      <ContactCard
        onEdit={() => {
          setShowAdd(true);
          setEditing(item);
        }}
        onDelete={() => promptDelete()}
        onAdd={() => null}
        item={item}
      />
    ));
  };

  const promptDelete = () => {};

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
    dispatch(startLoading());
    usersCollection
      .doc(number)
      .update({contacts: newContacts})
      .then(() => {
        if (adding && newContact) {
          dispatch(addContact(newContact));
        }
        //flash message here
      })
      .finally(() => {
        setTimeout(() => dispatch(endLoading()), 2000);
      });
  };

  const deleteContact = (bye: Contact) => {
    const newList = contacts.filter((c: Contact) => c.name === bye.name);
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
