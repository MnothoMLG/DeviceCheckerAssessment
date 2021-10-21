import React from 'react';
import {View} from 'react-native';
import PhoneIcon from '../../assets/icons/PhoneIcon';
import ProfileIcon from '../../assets/icons/ProfileIcon';
import {Image, Text} from '../../components';
import {Colors, Fonts, shadow} from '../../constants';
import {Row} from '../layout/layout';
import styles from './styles';

const MenuItem = props => {
  const {item} = props;
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <ProfileIcon size={50} fill={'#000'} />
      </View>
      <View style={styles.itemInfo}>
        <Text color={Colors.overlayDark70} font={Fonts.captionBold}>
          {item.name}
        </Text>

        <Row>
          <PhoneIcon size={16} />
          <Text ml={1} font={Fonts.barText} color={Colors.black}>
            {'+27 1235 5635'}
          </Text>
        </Row>
      </View>

      <View
        style={{
          width: 10,
          height: 30,
          backgroundColor: '#000',
          position: 'absolute',
          right: 10,
        }}
      />
    </View>
  );
};

export default MenuItem;
