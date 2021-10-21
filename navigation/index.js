import React, { Component } from 'react'
import { Alert, Animated, Easing, Image, ImageBackground, Modal, StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import { GetAllComms, StartUpAction, RequestBrochures, 
  changeView, clearError,storeMetrics } from '../actions/appActions'
import Images from '../assets/images'
import { Connection, Text } from '../components'
import { Colors, Fonts,Enums, Metrics, Strings } from '../constants'
import { iPhoneLarge } from '../utils/screenSize'
import NavigationService from './NavigationService'
import NavigationStack from './NavigationStack'

const { width , height } = Metrics.window
class AppNavigator extends Component {
    state = {
      showSplash : false
        
    }
    barPosition = new Animated.Value(0)
    barcodePosition = new Animated.Value(0)

    componentWillMount (){
      const { changeSplashView, startUp , initFetch } = this.props
      let  stops = [ rad(2,10) , rad(width * 0.25, width * 0.40) , rad(width * 0.65, width * 0.80) , width ]
        
      startUp()
      initFetch()

      stops.forEach((stop)=>{
        let animDuration =  rad(3000,8000)
        Animated.parallel([
  
          Animated.timing(this.barcodePosition, {
            toValue: -stop,
            duration: animDuration
          }),
          Animated.timing(this.barPosition, {
            toValue: -stop,
            duration: animDuration,
            easing: Easing.linear
          })
        ]).start(()=>{
          if(stop === width) setTimeout(()=>{this.setState({ showSplash:false })}, 300)
        })
      })
      changeSplashView()

    }


  

    render () {
      return [
        <StatusBar backgroundColor ={Colors.focusColor}
          barStyle = 'dark-content'
          hidden = {false}
          key={1}
          translucent = {true}/>,
        <Connection key ={2}/>,
        !this.state.showSplash && <NavigationStack
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      ]
    }
}

const mapDispatchToProps = dispatch => ({
  changeSplashView : payload => dispatch(changeView(payload)),
  removeFav: payload => dispatch(removeFromFavourites(payload)),
  storeDeviceMetrics : () => dispatch(storeMetrics()),
  getFavs: () => dispatch(getFavourites()),
  startUp: () => dispatch(StartUpAction()),
  initFetch: () => {
    dispatch(GetAllComms())
    dispatch(RequestBrochures())
  },
  clearErrorMSg : () => dispatch(clearError())
})

const mapStateToProps = state => ({
  state : state,
  viewNo: state.dataReducer.viewNo,
  error : state.dataReducer.error
})

const commodities = [
  { name: 'PLATINUM', description : Strings.PLATINUM ,image : Images.platinum },
  { name: 'GOLD', description : Strings.GOLD  ,image : Images.gold },
  { name: 'COPPER' , description : Strings.COPPER ,image : Images.copper },
  { name: 'RARE EARTH',  description : Strings.RARE_EARTH ,image : Images.rareEarth }
]



rad = (min,max) => {
  return Math.random() * (+max - +min) + +min 
}

export default connect(mapStateToProps,mapDispatchToProps)(AppNavigator)

// FIXME: Use Strings and Metrics file. Rmoeve inline styles.
