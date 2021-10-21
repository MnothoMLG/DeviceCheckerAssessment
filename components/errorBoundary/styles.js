import { StyleSheet } from 'react-native'

import { Colors, Metrics, Theme } from '../../constants'

export default StyleSheet.create({
  button :{
    marginHorizontal: Metrics.base,
    width: Metrics.base * 30,
    height: Metrics.base * 12
  },
  topContainer :{
    flexDirection: 'row',
    backgroundColor: Colors.romansRed,
    width: '100%',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalInnerContainer:{
    flex:1, 
    paddingBottom : Metrics.base * 6,
    backgroundColor: Colors.overlayDark20, 
    width :'100%',
    height:'100%', 
    alignItems:'center'
  },
  outerContainer: {
    alignItems: 'center',
    paddingTop : Metrics.base *3,
    height: Metrics.window.height,
    width: Metrics.window.width
  },
  errorTextContainer:{
      flex : 5,
      width : '100%',
      height : '100%'
  },
  errorImage :{
    height: Metrics.base * 8,
    width: Metrics.base * 8,
    marginHorizontal: Metrics.base * 2
  },
  logo :{
    height: Metrics.base * 6,
    width: Metrics.base * 10,
    marginTop: Metrics.base * 4
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.screenBackground,
    borderRadius: Metrics.radius,
    height: '85%',
    width: '80%'
  },
  buttonContainer :{
    marginBottom: Metrics.base * 2,
    flexDirection: 'row',
    justifyContent : 'space-between'
  }
})
