import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { connect } from 'react-redux'

import { RequestBrochures, UpdateBrochuresList, UpdateUserEmail } from '../../actions/appActions'
import Images from '../../assets/images'
import { Card, Cell, Graph, Text } from '../../components'
import { Fonts, Metrics } from '../../constants'
import { Colors } from '../../constants/'
import { dateString } from '../../utils/dateTime'
import localStorage from '../../utils/localStorage'
import Loading from '../Loading'
import styles from './styles'

const { width, height } = Metrics.window
const brochuresHeadText = 'Enter your e-mail address and select from the list below and hit send:'
//The following code executes inside one of your component's methods, post render

class Brochures extends Component {

    state = {
      focusedEntry : 'NONE', //change on unmount,
      fontSize : 20,
      modalVisible : false,
      showSplash : true,
      selectedRange : '1Y',
      normalize : false,
      checkedComss : [],
      allBrochures : [],
      userEmail : null
    }

    componentDidMount (){

     
    }

    

    switchView (pos,entry){
      const { focusedEntry } = this.state
      this.setState({ modalVisible :  true, focusedEntry : entry })
    }
    isChecked (entry){
      return this.state.checkedComss && this.state.checkedComss.includes(entry.value)
    }

    toggleCheck (entry){
      const { checkedComss , userEmail } = this.state
      const { value } = entry
      const { onCheckedListUpdate } = this.props
      let checked = this.isChecked(entry)
      if(checked){
        let list = this.state.checkedComss
        let pos = list.indexOf(value)
        list[pos] = null 
        this.setState({ checkedComss : list })
      }
      else{
        let cList = this.state.checkedComss
        cList.push(entry.value)
        this.setState({ checkedComss : cList })
      }
       
      onCheckedListUpdate(checkedComss , userEmail)
        
    }

    renderEntry (entry, toggle = false){
      const { label } = entry
      let checked = this.isChecked(entry)
      return(
        <Cell
          noBorder
          backgroundColor={toggle ? Colors.lightGrey : null}
          height={6}
          imageHeight={Metrics.base * 3}
          imageLeft={Images.download}
          imageRight={checked ? Images.checkBoxChecked : Images.checkBoxUnchecked}
          imageWidth={Metrics.base * 3}
          ph={2}
          textFont={Fonts.displayBold}
          textLeft={`  ${label}`}
          textLeftColor={Colors.overlayDark50}
          onPress={()=> this.toggleCheck(entry)}
        />
      )
    }

    render () {
      let toggle = false
      const { setUserEmail, brochures } = this.props
      const { checkedComss ,allBrochures ,userEmail } = this.state

      return [
           
        <View style={[styles.container, { backgroundColor : Colors.white }]}>
          <View style={styles.titleContainer}>
            <Text  font={Fonts.titleBold}>Request Brochures</Text>
            <Text  font={Fonts.button}
              mt={1.5}>{brochuresHeadText}
            </Text>
  
          </View>
          {brochures ? [ 
            <View style={styles.textInput}>
              <TextInput
                placeholder={'E-mail address'}
                style={{ ...Fonts.button , flex : 1, marginHorizontal : 2, width: '100%', color : Colors.textGrey }}
                onChangeText={(text)=> { 

                  setUserEmail(text)   
                }
                }
              />
            </View>,
            <ScrollView style={{ width:'100%' }}>
              {  
                brochures.map(entry=>{
                  toggle = !toggle
                  return this.renderEntry(entry, toggle)
                })
              }
            </ScrollView> ] :  <Loading displayText={''}
            visible={!brochures} />  }
        </View>  
                
      ]
    }
}

const mapDispatchToProps = dispatch => ({
  setUserEmail: (mail) => dispatch(UpdateUserEmail(mail))
})

const mapStateToProps = state => ({
  state : state,
  brochures : state.localState.brochures,
  brochureRequestFeedBack : state.localState.brochureRequestFeedBack
})
  
export default connect(mapStateToProps,mapDispatchToProps)(Brochures)
  
// FIXME: Remove logs, unused imports and inline styles.