import { Colors, Fonts, Strings } from '../../constants'
import { Modal, Text } from '..'
import {
  NetInfo,
  View
} from 'react-native'
import React, { Component } from 'react'

import PropTypes from 'prop-types'
import Styles from './styles'

class Connection extends Component {
  state = { isConnected: true }

  componentDidMount () {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange
    )
    // Check internet connection when component mounts
    this._handleConnectivityChange()
  }

  componentWillUnmount () {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleFirstConnectivityChange
    )
  }

  _getConnectionStatus = async () => {
    const isConnected = await NetInfo.isConnected.fetch()
    this.setState({ isConnected })
  }

  _handleConnectivityChange = (isConnected = false) => {
    if (!isConnected) {
      // If user turns off wifi but has mobile data on, the status is set to offline. In that case, to avoid showing the modal, wait 2.5s and confirm if the connection is really offine.
      setTimeout(this._getConnectionStatus, 3000)
    } else {
      this.setState({ isConnected })
    }
  }

   _renderDefault = () => {
     const {
       backgroundColor,
       body,
       fonts,
       title
     } = this.props
     return (
       <View style={[Styles.container, backgroundColor]}>
         {title && (
           <Text
             align='center'
             color={fonts.title && fonts.title.color ? fonts.title.color : Colors.primaryGreen}
             font={fonts.title && fonts.title.font ? fonts.title.font : Fonts.heading}
             mh={2}
           >{title}
           </Text>
         )}
         {body && (
           <Text
             align='center'
             color={fonts.body && fonts.body.color ? fonts.body.color : Colors.primaryGreen}
             font={fonts.body && fonts.body.font ? fonts.body.font : Fonts.body}
             mh={2}
             mt={1}
           >{body}
           </Text>
         )}
       </View>
     )
   }

   render () {
     const {
       animationType,
       children,
       transparent
     } = this.props
     const { isConnected } = this.state

     return (
       <Modal
         animationType={animationType}
         transparent={transparent}
         visible={!isConnected}
         onRequestClose={() => {}}
       >
         {children || this._renderDefault()}
       </Modal>
     )
   }
}

Connection.propTypes = {
  animationType: PropTypes.string,
  backgroundColor: PropTypes.string,
  body: PropTypes.string,
  fonts: PropTypes.object,
  title: PropTypes.string,
  transparent: PropTypes.bool
}

Connection.defaultProps = {
  animationType: 'fade',
  backgroundColor: Colors.overlayLight90,
  body: 'Please ensure that your internet connection is stable.',
  fonts: {
    body: { font: null, color: null },
    title: { font: null, color: null }
  },
  title: 'No Connection',
  transparent: true
}

export default Connection
