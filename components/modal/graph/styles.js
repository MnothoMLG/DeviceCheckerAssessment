import { Colors, Metrics } from '../../../constants'
import { Platform, StyleSheet } from 'react-native'

import { iPhoneLarge } from '../../../utils/screenSize'

const tinyBorder = {
  borderColor : Colors.textGrey,
  borderWidth:1
}
const noBorder = {
  borderWidth :0
}
const styles = StyleSheet.create({
  bottomButtonBar:{
    alignItems :'center' , backgroundColor : Colors.focusColor ,
    bottom :0, 
    flexDirection:'row', 
    flex:1 ,
    // marginTop: iPhoneLarge ? Metrics.base * 2 : 0,
    marginTop: Metrics.base * 3,
    // height: iPhoneLarge ? 74 :56, 
    justifyContent : 'space-between' , paddingHorizontal : Metrics.base * 2,
    position: 'absolute',width : '100%' ,
    zIndex :1 ,
    paddingTop: Metrics.base,
    paddingBottom: iPhoneLarge && Platform.OS === 'ios'  ? Metrics.base * 2 : Metrics.base * 1.5   
  },
  cardTopWrapper:{
    alignItems : 'center' , backgroundColor : Colors.focusColor,
    paddingTop : iPhoneLarge && Platform.OS === 'ios'  ? Metrics.base * 4 : Metrics.base * 1.5 , 
    width: '100%',
    zIndex: -1,
    overflow: 'visible'
  },
  toolTipStyles : {
    height : Metrics.base * 2.5 , backgroundColor : Colors.transparent , marginTop :4, alignItems : 'center',
    borderColor : Colors.black, borderRadius : Metrics.base * 2, borderWidth : 1, position :  'absolute' , top :0, width : Metrics.base * 6 
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop : 42,
    width:'100%'
  },
  graphContentWrapper:{ 
    alignItems : 'center', backgroundColor : Colors.white,
    flex:1, 
    height: '100%',justifyContent:'space-between',
    width: '100%'
  },
  graphWrapper:{
    alignItems : 'center' , 
    backgroundColor : Colors.white,
    // flex: 1 ,
    // height: '100%' ,
    // justifyContent: 'space-between' , 
    // marginBottom :iPhoneLarge? 0 : 56 ,
    // marginTop: iPhoneLarge ? Metrics.base * 10 : 0, 
    marginBottom: Metrics.base * 15,
    // paddingTop: Metrics.base * 2,
    width : '100%',
    overflow:'visible',
  },
  modalWrapper:{
    alignItems : 'center' ,
    backgroundColor : Colors.focusColor,
    borderTopLeftRadius : Metrics.base * 3,
    borderTopRightRadius : Metrics.base * 3,flex:1 , marginTop: Metrics.base * 2,
    paddingTop: Metrics.base
  },
  range:{
    alignItems : 'center', 
    backgroundColor:Colors.transparent,
    borderRadius: Metrics.base * 2 ,
    height: Metrics.base * 4,
    justifyContent: 'center' ,
    width: Metrics.base * 7,
    ...tinyBorder
  },
  rangeSelected :{
    backgroundColor:Colors.secondayGreen, 
    ...noBorder
  },
  tittleWrapper: {
    flexDirection :'row' , justifyContent : 'space-between',marginBottom : Metrics.base * 4.5,
    paddingHorizontal: Metrics.base * 3,
    width:'100%'
  }

})

export default styles
