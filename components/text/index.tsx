import PropTypes from 'prop-types';
import React from 'react';
import {Text as RnText} from 'react-native';

import {Fonts, Metrics, Theme} from '../../constants';
import Styles from './styles.ts';

const Text = ({
  align,
  children,
  color,
  font,
  mb,
  mh,
  ml,
  mr,
  mt,
  mv,
  numberOfLines,
  styles,
  ...props
}) => (
  <RnText
    {...props}
    numberOfLines={numberOfLines}
    style={[
      Styles.text,
      {
        ...font,
        color,
        marginBottom: Metrics.base * mb || null,
        marginHorizontal: Metrics.base * mh || null,
        marginLeft: Metrics.base * ml || null,
        marginRight: Metrics.base * mr || null,
        marginTop: Metrics.base * mt || null,
        marginVertical: Metrics.base * mv || null,
        textAlign: align,
      },
      styles.text,
    ]}>
    {children}
  </RnText>
);

Text.defaultProps = {
  align: 'left',
  bold: null,
  children: null,
  color: Theme.textColorPrimary,
  ellipsizeMode: 'tail',
  font: Fonts.bodyBold,
  mb: null,
  mh: null,
  ml: null,
  mr: null,
  mt: null,
  mv: null,
  numberOfLines: 2,
  styles: {
    text: null,
  },
};

export default Text;
