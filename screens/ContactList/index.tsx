import React, {useState} from 'react';
import {TouchableOpacity, Modal, SafeAreaView, ScrollView} from 'react-native';
import {Text} from '../../components';
import {Colors, Fonts} from '../../constants';
import images from '../../assets/images';
import AddProduct from './AddContact';
import ContactCard from '../../components/menuItem';
import styles from './styles';
import {useSelector} from 'react-redux';

const ContactList = props => {
  const [addVisible, setShowAdd] = useState(false);
  const contacts = useSelector(state => state.contactsReducer.contacts);

  const renderContacts = () => {
    return contacts.map(item => <ContactCard onAdd={() => null} item={item} />);
  };

  const renderAddButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('adsibfewidoivebewo');
          setShowAdd(true);
        }}
        style={{
          borderColor: Colors.white,
          borderWidth: 2,
          position: 'absolute',
          bottom: 10,
          right: 10,
          height: 60,
          width: 60,
          borderRadius: 30,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#FF2D55',
        }}>
        <Text font={Fonts.bodyBold} color="#fff">
          Add
        </Text>
      </TouchableOpacity>
    );
  };

  const renderAddContactModal = () => {
    return (
      <Modal
        animationType="slide"
        onRequestClose={() => {
          setShowAdd(false);
        }}
        visible={addVisible}>
        <AddProduct
          closeModal={() => {
            setShowAdd(false);
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

const foodItems = [
  {name: 'Ribs, Wings and Chips', price: '150.00', image: images.combo},
  {name: 'Burger and Chips', price: '90.00', image: images.burger},
  {name: 'Ribs, Wings and Chips', price: '150.00', image: images.combo},
  {name: 'Burgerand Chips', price: '90.00', image: images.burger},
];

export default ContactList;
