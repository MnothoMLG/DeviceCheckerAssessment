import { StyleSheet } from 'react-native'
import { Metrics , Colors } from '../../constants'


const styles = StyleSheet.create({
  cardsWrapper :{
    flex:1, marginBottom : Metrics.base * 5 ,
    marginHorizontal : Metrics.base * 2.25
    
  },
  cellBorder: {
    borderBottomColor : Colors.focusColor , 
    borderBottomWidth : 1
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop : Metrics.base * 5.25
  }

})

export default styles
