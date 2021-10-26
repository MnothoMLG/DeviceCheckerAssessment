import React from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import PhoneIcon from '../../assets/icons/PhoneIcon';

import {Text} from '../../components';
import styles from '../../components/card/styles';
import {Margin} from '../../components/layout/layout';
import {Fonts, Metrics} from '../../constants';

const EmergencyCalling = (props: {visible: any; onSafe: any}) => {
  const contacts = useSelector(state => state.contactsReducer.contacts);

  const {visible, onSafe} = props;
  return [
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => {
        onSafe && onSafe();
      }}>
      <View
        style={{
          justifyContent: 'space-between',
          backgroundColor: '#FF2D55',
          width: '100%',
          flex: 1,
          alignItems: 'center',
          marginTop: Metrics.base * 5,
          marginBottom: Metrics.base * 4.5,
          paddingHorizontal: Metrics.base * 3,
          paddingVertical: 20,
        }}>
        <View>
          <Text color="#fff" font={Fonts.displayBold}>
            Emergency Calling...
          </Text>
        </View>

        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#fff',
          }}>
          <PhoneIcon size={50} />
        </View>
        <Margin marginTop={22}>
          <Text
            align="center"
            color="#fff"
            mb={4}
            font={Fonts.headingBold}
            style={styles.favButtonText}>
            {`Sending alert to ${contacts.length} contacts`}
          </Text>
          <Text align="center" style={styles.favButtonText}>
            {' '}
            Your contacts and your organization will see your request for help
          </Text>
        </Margin>
        <TouchableOpacity
          onPress={() => onSafe && onSafe()}
          style={styles.btnWrapper}>
          <Text font={Fonts.buttonBold}>I am safe</Text>
        </TouchableOpacity>
      </View>
    </Modal>,
  ];
};

export default EmergencyCalling;