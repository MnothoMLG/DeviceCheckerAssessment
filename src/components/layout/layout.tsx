import {View} from 'react-native';
import styled from 'styled-components/native';
import React from 'react';

export const Center = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export function Margin({
  mb,
  ml,
  mr,
  mt,
  children,
  style,
}: {
  [key: string]: number | Element;
}) {
  return (
    <View
      style={[
        {
          marginTop: mt as number,
          marginBottom: mb as number,
          marginLeft: ml as number,
          marginRight: mr as number,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

export function Padding({
  pb,
  pl,
  pr,
  pt,
  children,
  style,
}: {
  [key: string]: number | Element;
}) {
  return (
    <View
      style={[
        {
          paddingTop: pt as number,
          paddingBottom: pb as number,
          paddingLeft: pl as number,
          paddingRight: pr as number,
        },
        style,
      ]}>
      {children}
    </View>
  );
}
