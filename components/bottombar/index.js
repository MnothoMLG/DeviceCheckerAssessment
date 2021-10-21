import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Dimensions, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'

import Images from '../../assets/images'
import Icons from '../../assets/icons'
import { Image, Text } from '..'
import { Colors, Fonts, Metrics }from '../../constants'
import { iPhoneLarge } from '../../utils/screenSize'
import styles from './BottomMenuStyle'
const activeFont =  iPhoneLarge ? Fonts.captionBold : Fonts.tinyBold
const inactiveFont = iPhoneLarge ? Fonts.caption : Fonts.tiny

class BottomMenu extends Component {

  _nav (navString){
    this.props.navigation.navigate(navString)  
  }

  bottomButton (inactiveIcon, activeIcon , navString) {
    const { navigation } = this.props
    const { index } = navigation.state
    const { key } = navigation.state.routes[index]
    let active = (navString === key)
    
    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => this._nav(navString)}
      >
        <View style={styles.baseButton}>
          {active ? activeIcon: inactiveIcon}
        
          <Text color={active ? Colors.romansRed : '#7D7D7D'}
            font={active ? activeFont : inactiveFont}
            numberOfLines={1}>{navString.toUpperCase()}
          </Text>
         
        </View>
      </TouchableOpacity>
    )
  }

  render () {  
    return (
      <View  style={styles.container}>
        

        {this.bottomButton(<Icons.HomeIcon fill={Colors.overlayDark20}/>,<Icons.HomeIcon fill={Colors.romansRed}/>,'Home')}
        {this.bottomButton(<Icons.SearchIcon fill={Colors.overlayDark20}/>,<Icons.SearchIcon fill={Colors.romansRed}/>, 'Search')}
        {this.bottomButton(<Icons.ReceiptIcon fill={Colors.overlayDark20}/>,<Icons.ReceiptIcon fill={Colors.romansRed}/>, 'Orders')}
        {this.bottomButton(<Icons.ProfileIcon fill={Colors.overlayDark20}/>,<Icons.ProfileIcon fill={Colors.romansRed}/>, 'Profile')}
        {/* {this.bottomButton(Images.comparison, Images.comparisonActive, "Comparison")} */}
        {/* {this.bottomButton(Images.contact, Images.contactActive, 'Contact')} */}


       
      </View>
    )
  }
}

export default (BottomMenu)

// FIXME: Use Colors and Strings files