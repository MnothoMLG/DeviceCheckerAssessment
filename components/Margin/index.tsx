import React from 'react';
import { View } from 'react-native';

const Margin = ({ mb, ml, mr, mt, children }: { [key: string]: number }) => (
  <View
    style={{
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    }}>
    {children}
  </View>
);

export default Margin;
