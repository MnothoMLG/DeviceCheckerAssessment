import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Fonts, Metrics, Theme } from '../../constants'
import { Image } from '..'
// import PreventDoubleClickHoc from '../hoc/preventDoubleClick'
import Text from '../text'
import Styles from './styles'

class Button extends Component {
  onPress = () => {
    const { onPress } = this.props

    if (onPress) onPress()
  }

  renderIconAndText = buttonTheme => {
    const { 
      align,
      font, 
      icon, 
      iconSize, 
      label ,
      textColor
    } = this.props
    
    const size = Metrics.base * iconSize

    return (
      <View style={{ width :'100%',flexDirection : 'row' , justifyContent : 'center', alignItems: 'center' }}>
        {icon && (
          <View
            key={0}
            style={[
              Styles.buttonIconContainer,
              {
                width: size
              }
            ]}>
            <Image
              height={size}
              source={icon}
              width={size}
            />
          </View>)}
    
        {label && (
          <View key={1}
            style={Styles.textContainer}>
            <Text 
              align={align}
              color={textColor}
              font={font}
              ml={0.75}
            >
              {label}
            </Text>
          </View>
        )}
      </View>)
  }

  renderContent = () => {
    const {
      font,
      icon,
      label,
      theme
    } = this.props
    
    let buttonTheme = Theme.button
    if (theme) buttonTheme = Theme.button[theme]
    return ([
      icon ? (
        this.renderIconAndText(buttonTheme)
      ) : (
        <Text
          align='center'
          font={font}
          key={2}
        >
          {label}
        </Text>
      )
    ])
  }

  render () {
    const {
      disabled,
      fetching,
      showOverlay,
      mb,
      mh,
      ml,
      mr,
      mt,
      mv,
      ph,
      width,
      height,
      backgroundColor,
      radius
    } = this.props
    
    const outerContainerStyles = {
      marginBottom : Metrics.base * mb || null,
      marginHorizontal: Metrics.base * mh || null,
      marginLeft: Metrics.base * ml || null,
      marginRight: Metrics.base * mr || null,
      marginTop: Metrics.base * mt || null,
      width,
      height,
      marginVertical: Metrics.base * mv || null,
      borderRadius : Metrics.base * radius || null,
      backgroundColor :  backgroundColor || null
    }

    return (

      <TouchableOpacity 
          disabled={disabled || fetching}
          onPress={this.onPress}
        >
        <View 
          style={outerContainerStyles}
          //{...this.props}
        >
          
            {showOverlay && <View style={Styles.overlayContainer}/> }
            <View style={Styles.mainContainer}>
              {this.renderContent()}   
            </View>    
        
        </View>
      </TouchableOpacity>
    )
  }
}

Button.propTypes = {
  align: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  fetching: PropTypes.bool,
  font: PropTypes.object,
  height: PropTypes.number,
  icon: PropTypes.number,
  iconSize: PropTypes.number,
  label: PropTypes.string,
  mb: PropTypes.number,
  mh: PropTypes.number,
  ml: PropTypes.number,
  mr: PropTypes.number,
  mt: PropTypes.number,
  mv: PropTypes.number,
  showOverlay: PropTypes.bool,
  theme: PropTypes.string,
  width: PropTypes.number,
  onPress: PropTypes.func
}

Button.defaultProps = {
  align: 'center',
  disabled: false,
  fetching: false,
  font: Fonts.bodyBold,
  // height: Metrics.base * 10,
  iconSize: 6,
  mb: null,
  mh: null,
  ml: null,
  mr: null,
  mt: null,
  mv: null,
  showOverlay: false,
  theme: null
  // width: Metrics.base * 30
}
export default (Button)
