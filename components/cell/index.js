import PropTypes from 'prop-types'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Colors, Fonts, Metrics } from '../../constants'
import { Image } from '../'
import { Text } from '../'
import Styles from './Styles'

const renderContent = ({
  bold, 
  contentCenter,
  contentLeft,
  contentRight,
  fontCenter,
  fontLeft,
  fontRight,
  imageCenter,
  imageHeight,
  imageLeft,
  imageRight,
  imageWidth,
  numberOfLines,
  textFont,
  textCenter,
  textCenterColor,
  textLeft,
  textLeftColor,
  textRight,
  textRightColor
}) => {
  const textProps = {
    numberOfLines,
    styles: { text: Styles.text }
  }

  return [
    imageLeft && (
      <Image  height={imageHeight}
        key={1}
        resizeMode={'contain'}
        source={imageLeft}
        width={imageWidth} />
    ),
    contentLeft && contentLeft,
    textLeft && (
      <Text
        {...textProps}
        color={textLeftColor || Colors.font}
        font={textFont || (bold ? Fonts.bodyBold : fontLeft)}
        key={2}
      >
        {textLeft}
      </Text>
    ),
    imageCenter && (
      <Image
        height={imageHeight}
        key={3}
        resizeMode={'contain'}
        source={imageCenter}
        width={imageWidth}
      />
    ),
    contentCenter && contentCenter,
    textCenter && (
      <Text
        {...textProps}
        align='center'
        color={textCenterColor || Colors.font}
        font={textFont || (bold ? Fonts.bodyBold : fontCenter)}
        key={4}
        styles={{ text: Styles.text }}
      >
        {textCenter}
      </Text>
    ),
    contentRight && contentRight,
    textRight && (
      <Text
        {...textProps}
        align='right'
        color={textRightColor || Colors.font}
        font={textFont || (bold ? Fonts.bodyBold : fontRight)}
        key={5}
        styles={{ text: Styles.text }}
      >
        {textRight}
      </Text>
    ),
    imageRight && (
      <Image
        height={imageHeight}
        key={6}
        resizeMode={'contain'}
        source={imageRight}
        width={imageWidth}
      />
    )
  ]
}

const Cell = ({
  backgroundColor,
  borderColor,
  delayPressIn,
  disabled,
  height,
  mb,
  mh,
  ml,
  mr,
  mt,
  mv,
  pb,
  ph,
  pl,
  pr,
  pt,
  pv,
  noBorder,
  onPress,
  ...props
}) => {
  const containerStyles = {
    backgroundColor,
    borderTopColor: borderColor,
    borderTopWidth: noBorder ? 0 : 1,
    marginBottom: Metrics.base * mb || null,
    marginHorizontal: Metrics.base * mh || null,
    marginLeft: Metrics.base * ml || null,
    marginRight: Metrics.base * mr || null,
    marginTop: Metrics.base * mt || null,
    marginVertical: Metrics.base * mv || null,
    paddingBottom: Metrics.base * pb || null,
    paddingHorizontal: Metrics.base * ph || null,
    paddingLeft: Metrics.base * pl || null,
    paddingRight: Metrics.base * pr || null,
    paddingTop: Metrics.base * pt || null,
    paddingVertical: Metrics.base * pv || null,
    minHeight: Metrics.base * height
  }

  return onPress ? (
    <TouchableOpacity
      delayPressIn={delayPressIn}
      disabled={disabled}
      style={[Styles.container, containerStyles]}
      onPress={onPress}>
      {renderContent({ ...props })}
    </TouchableOpacity>
  ) : (
    <View style={[Styles.container, containerStyles]}>
      {renderContent({ ...props })}
    </View>
  )
}

Cell.propTypes = {
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  contentCenter: PropTypes.element,
  contentLeft: PropTypes.element,
  contentRight: PropTypes.element,
  delayPressIn: PropTypes.number,
  disabled: PropTypes.bool,
  fontCenter: PropTypes.object,
  fontLeft: PropTypes.object,
  fontRight: PropTypes.object,
  height: PropTypes.number,
  imageCenter: PropTypes.number,
  imageHeight: PropTypes.number,
  imageLeft: PropTypes.number,
  imageRight: PropTypes.number,
  imageWidth: PropTypes.number,
  mb: PropTypes.number,
  mh: PropTypes.number,
  ml: PropTypes.number,
  mr: PropTypes.number,
  mt: PropTypes.number,
  mv: PropTypes.number,
  noBorder: PropTypes.bool,
  numberOfLines: PropTypes.number,
  pb: PropTypes.number,
  ph: PropTypes.number,
  pl: PropTypes.number,
  pr: PropTypes.number,
  pt: PropTypes.number,
  pv: PropTypes.number,
  radius: PropTypes.bool,
  styles: PropTypes.object,
  textCenter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textCenterColor: PropTypes.string,
  textFont: PropTypes.object,
  textLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textLeftColor: PropTypes.string,
  textRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textRightColor: PropTypes.string,
  onPress: PropTypes.func
}

Cell.defaultProps = {
  backgroundColor: Colors.transparent,
  borderColor: Colors.grey4,
  contentCenter: null,
  contentLeft: null,
  contentRight: null,
  delayPressIn: 0,
  disabled: null,
  fontCenter: Fonts.body,
  fontLeft: Fonts.body,
  fontRight: Fonts.body,
  height: 6,
  imageCenter: null,
  imageHeight: Metrics.base * 6,
  imageLeft: null,
  imageRight: null,
  imageWidth: Metrics.base * 6,
  mb: null,
  mh: null,
  ml: null,
  mr: null,
  mt: null,
  mv: null,
  noBorder: false,
  numberOfLines: 2,
  onPress: null,
  pb: null,
  ph: null,
  pl: null,
  pr: null,
  pt: null,
  pv: null,
  radius: null,
  textCenter: null,
  textCenterColor: null,
  textFont: null,
  textLeft: null,
  textLeftColor: null,
  textRight: null,
  textRightColor: null
}

export default Cell