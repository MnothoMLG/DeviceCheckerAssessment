import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Padding, Text} from '../../components';
import strings from '../../constants/strings';
import {getAuthState} from '../../store/auth/selectors';

const Greeting: React.FC = () => {
  const {name} = useSelector(getAuthState);
  if (!name) {
    return <></>;
  }
  return (
    <Padding pl={24} pr={24} style={styles.container}>
      <Text>{strings.hello.replace('{0}', name!)}</Text>
    </Padding>
  );
};

export default Greeting;

const styles = StyleSheet.create({
  container: {width: '100%', flexDirection: 'row', justifyContent: 'center'},
});
