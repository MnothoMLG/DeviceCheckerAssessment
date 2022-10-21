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

interface RowProps {
  marginTop?: number;
  marginBottom?: number;
  background?: string;
  alignHorizontal?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
}

export const Row = styled.View<RowProps>`
  width: 100%;
  flex-direction: row;
  margin-top: ${({marginTop}: RowProps) => marginTop || '0'}px;
  margin-bottom: ${({marginBottom}: RowProps) => marginBottom || '0'}px;
  background-color: ${({background}: RowProps) => background || 'transparent'};
  justify-content: ${({alignHorizontal}: RowProps) =>
    alignHorizontal || 'flex-start'};
  flex-wrap: ${({flexWrap}: RowProps) => flexWrap || 'wrap'};
`;

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
