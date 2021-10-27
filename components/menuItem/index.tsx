import React from 'react';
import {View} from 'react-native';
import PhoneIcon from '../../assets/icons/PhoneIcon';
import ProfileIcon from '../../assets/icons/ProfileIcon';
import {Text} from '../../components';
import {Colors, Fonts} from '../../constants';
import {Row} from '../layout/layout';
import styles from './styles';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Contact} from '../../redux/modules/contacts/types';
import Image from '../image';
import images from '../../assets/images';

interface Props {
  item: Contact;
  onDelete: () => void;
  onEdit: () => void;
}

const MenuItem = (props: Props) => {
  const {item, onDelete, onEdit} = props;
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
            {item.number}
          </Text>
        </Row>
      </View>

      <View
        style={{
          width: 10,
          height: 30,
          position: 'absolute',
          right: 20,
        }}>
        <Menu>
          <MenuTrigger
            style={{
              width: 10,
              alignItems: 'center',
              height: 30,
            }}>
            <Image source={images.dots} width={20} height={30} />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              style={styles.option}
              onSelect={() => onEdit && onEdit()}
              text="Edit"
            />
            <MenuOption
              style={styles.option}
              onSelect={() => onDelete && onDelete()}
              text="Delete"
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default MenuItem;
