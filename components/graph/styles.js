import { Colors, Fonts, Metrics } from '../../constants'
import { StyleSheet } from 'react-native'
import { iPhoneLarge } from '../../utils/screenSize';
const scaleUp = iPhoneLarge ? 1.25 : 1

const tinyBorder = {
  borderColor : Colors.textGrey,
  borderWidth:1
}
const noBorder = {
  borderWidth :0
}
const styles = StyleSheet.create({
  chartStyles:{ 
    flex: 1, 
    alignSelf  :'flex-start',
    height: '100%',
    width:'100%',

  },
  toolTipStyles : {
    height : Metrics.base * 2.5 , backgroundColor : Colors.transparent , marginTop :4, alignItems : 'center',
    borderColor : Colors.black, borderRadius : Metrics.base * 2, borderWidth : 1, position :  'absolute' , top :0, width : Metrics.base * 6 
  },
  rangesWrapper : { 
    width : '100%', justifyContent: 'space-between', marginTop : Metrics.base ,
    flexDirection : 'row', height : Metrics.base * 2.5 * scaleUp ,
    paddingHorizontal : Metrics.base*2 * scaleUp 
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  graphBottomWrapper:{
    flex: 8,
    overflow : 'visible',
    zIndex : 10,
    height:'100%'
  },
  normalizeButton:{
    alignItems: 'center',
    backgroundColor :  Colors.transparent,
    borderRadius : Metrics.base * 2,
    height : Metrics.base * 4 ,
    justifyContent: 'center',
    width : Metrics.base * 26.625,
    ...tinyBorder   
  },
  normalizeButtonON:{
    backgroundColor : Colors.secondayGreen ,
    ...noBorder   
  },
  range:{
    alignItems : 'center', 
    backgroundColor:Colors.transparent,
    borderRadius: Metrics.base * 2 ,
    height: '100%',
    justifyContent: 'center',
    width: Metrics.base * 5 * scaleUp,
    ...tinyBorder
  },

  rangeSelected :{
    backgroundColor:Colors.secondayGreen, 
    ...noBorder
  },

  yAxisLabel : {
    alignItems:'center',
    height:'100%',
    justifyContent:'center',
    marginRight: Metrics.base  ,
    // backgroundColor : 'red',
    width : Metrics.base,
  },
  y_graph_Wrapper:{ 
    flexDirection: 'row',
    height : '92%',
    overflow: 'visible',
    // backgroundColor : 'yellow',
    // paddingBottom: Metrics.base * 16,
    // paddingTop: Metrics.base * 3,
    width : '100%'
  }


})

export default styles
