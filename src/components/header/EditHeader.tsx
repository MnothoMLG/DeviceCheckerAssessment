import React from 'react';
import {Text, TouchableOpacity, View, SafeAreaView} from 'react-native';
import styles from './styles';
// import BackIcon from '../../assets/icons/BackIcon';
import {useNavigation} from '@react-navigation/native';

interface Props {
  header: string;
}

const EditHeader = (props: Props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backImageSize}>
          {/* <BackIcon /> */}
        </TouchableOpacity>
        <Text style={[styles.justifyContent, styles.editHeaderHeading]}>
          {props.header}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default EditHeader;
