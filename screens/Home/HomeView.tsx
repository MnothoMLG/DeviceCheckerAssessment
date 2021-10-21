//import liraries
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import images from '../../assets/images';
import {Image} from '../../components';
import {Margin} from '../../components/layout/layout';

import {Colors, shadow} from '../../constants';
import EmergencyCalling from '../EmergencyCalling';

// create a component
const HomeScreen = () => {
  const [showEmergency, setShow] = useState(false);

  return [
    <SafeAreaView style={{backgroundColor: Colors.white}} />,
    <EmergencyCalling onSafe={() => setShow(false)} visible={showEmergency} />,
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.panic}>
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
