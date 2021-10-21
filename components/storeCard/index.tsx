//import liraries
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import images from '../../assets/images';
import {Fonts} from '../../constants';
import {Text, Image} from '../../components';
import styles from './styles';
interface IProps {
  store: any;
}

const StoreCard = (props: IProps) => {
  const {store} = props;
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductList')}
        underlayColor={'#00000010'}>
        <>
          <View style={styles.imgSection}>
            <View style={styles.offer} />
          </View>
          <View style={styles.details}>
            <Image
              network
              width={50}
              resizeMode="contain"
              height={50}
              radius
              mr={1}
              source={props.store.imageUrl}
            />
            <View>
              <Text font={Fonts.tinyBold} color={Colors.overlayDark60}>
                {props.store.title}
              </Text>
              <View style={styles.ratingWrapper}>
                {[1, 1, 1, 1].map(() => (
                  <Image
                    width={16}
                    height={16}
                    resizeMode="contain"
                    source={images.favouriteActive}
                  />
                ))}
                <Text ml={1} font={Fonts.tinyBold} color={Colors.overlayDark40}>
                  • 4.0 (250)
                </Text>
              </View>
            </View>
          </View>
        </>
      </TouchableOpacity>
    </View>
  );
};
export default StoreCard;
