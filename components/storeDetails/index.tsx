import React from 'react';
import {Linking, Platform, TouchableOpacity, View} from 'react-native';
import {Image, Text} from '../../components';
import {Colors, Fonts} from '../../constants';
import images from '../../assets/images';
import styles from './styles';
import PhoneIcon from '../../assets/icons/PhoneIcon';
import LocationIcon from '../../assets/icons/LocationIcon';

const StoreDetails = () => {
  const _handlePressDirections = (
    target: {geometry: {location: any}; postalCode: any; city: any},
    addressLabel: string,
  ) => {
    let {
      geometry: {location},
    } = target;
    const {lat, lng} = location;
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${lat},${lng}`;
    const label = addressLabel || 'Destination';
    const url =
      Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      }) || '';
    Linking.openURL(url);
  };

  <View style={styles.container}>
    <View style={styles.wrapper}>
      <Text font={Fonts.heading} color={Colors.overlayDark60}>
        Nembula's Grilland Pub
      </Text>
      <View style={styles.detail}>
        <View>
          <Text font={Fonts.caption} color={Colors.overlayDark30}>
            Ribs • Wings • Drinks{' '}
          </Text>
          <View style={styles.ratings}>
            {[1, 1, 1, 1].map(() => (
              <Image width={20} height={20} source={images.favouriteActive} />
            ))}
            <Text ml={1} font={Fonts.tinyBold} color={Colors.overlayDark40}>
              • 4.0 (250)
            </Text>
          </View>
        </View>

        <View style={styles.reach}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${'1234'}`);
            }}
            style={styles.actionWrapper}>
            <PhoneIcon />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={
              () =>
                _handlePressDirections(
                  {
                    geometry: {location: {lat: 0, long: 0}},
                  },
                  'Test Address',
                ) //should be the address
            }
            style={styles.actionWrapper}>
            <LocationIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text font={Fonts.tiny} color={Colors.overlayDark40}>
          10am - 8pm
        </Text>
        <View style={styles.openClosed}>
          <Text font={Fonts.tiny} color={Colors.white}>
            Open
          </Text>
        </View>
      </View>
    </View>
  </View>;
};

export default StoreDetails;
