import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {AppButton, Margin, Padding, Text} from '../../components';
import {getAuthState} from '../../store/auth/selectors';
import styles from './styles';

const Home: React.FC = () => {
  const onLogout = () => {}; //dispatch(loginActions.logOut());
  const {name} = useSelector(getAuthState);
  const {navigate} = useNavigation();
  const goBack = () => {
    onLogout();
  };

  return (
    <View style={styles.container}>
      <Text style={{padding: 5}}>{`Hey, ${name}`}</Text>
      <Margin mb={56} />
      <Padding pl={24} pr={24} style={{width: '100%'}}>
        <AppButton
          fullWidth
          variant="clear"
          disabled={false}
          onPress={() => {}}
          rounded
          textSize={14}
          label={'Clear Button'}
        />
        <Margin mb={12} />
        <AppButton
          fullWidth
          variant="dark"
          disabled={false}
          onPress={() => {}}
          textSize={14}
          rounded
          label={'Secondary'}
        />
        <Margin mb={12} />
        <AppButton
          fullWidth
          variant="light"
          disabled={false}
          onPress={() => {
            navigate('DeviceCheck');
          }}
          textSize={14}
          rounded
          label={'Primary'}
        />
        <Margin mb={12} />
        <AppButton
          label="back"
          mode="outlined"
          fullWidth
          rounded
          onPress={goBack}
        />
      </Padding>
    </View>
  );
};

export default Home;
