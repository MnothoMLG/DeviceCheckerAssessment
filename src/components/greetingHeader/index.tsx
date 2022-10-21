import React from 'react';
import {useSelector} from 'react-redux';
import {Padding, Text} from '../../components';
import {getAuthState} from '../../store/auth/selectors';

const Greeting: React.FC = () => {
  //ToDo: move this to a wrapper container
  const {name} = useSelector(getAuthState);
  return (
    <Padding
      pl={24}
      pr={24}
      style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
      <Text style={{padding: 5}}>{`Hey, ${name}`}</Text>
    </Padding>
  );
};

export default Greeting;
