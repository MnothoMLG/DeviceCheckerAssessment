import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Modal, ScrollView, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { connect } from 'react-redux'

import { addToFavourites, getFavourites, removeFromFavourites } from '../../actions/appActions'
import Images from '../../assets/images'
import { Card, Graph, Image, Text } from '../../components'
import { Fonts, Metrics } from '../../constants'
import { Colors } from '../../constants/'
import localStorage from '../../utils/localStorage'
import styles from './styles'

const { width, height } = Metrics.window
//The following code executes inside one of your component's methods, post render

class ListView extends Component {

    state = {
      focusedEntry : null, //change on unmount,
      fontSize : 20,
      modalVisible : false,
      showSplash : true,
      selectedRange : 'MONTH',
      favCommodities : this.props.favourites || [],
      currentlySwiped : null
    }

    updatedSwiped = (name) => {
      this.setState({ currentlySwiped : name })
    }

    switchView (pos,entry){
      const { focusedEntry } = this.state
      this.setState({ modalVisible :  true, focusedEntry : entry })

    }
    
    renderEntry (entry, toggle = false){
      const { viewGraph ,viewHeight ,  defaultHeight,focusedEntry , currentlySwiped } = this.state
      const { onCardPress , toggleFavor } = this.props
      let focused = (focusedEntry === entry)
      let topPos = focused ? this.state.focusedTop : null
      let fav = this.checkFav(entry.name)
      let bgColor = !toggle ? Colors.transparent : Colors.focusColor
      
      return(
       (entry !== null) && <Card    
          clickable
          indicateFavourite
          bgColor={bgColor}
          currentlySwiped={currentlySwiped}
          entry={entry}
          fav={fav}
          focusedEntry={focusedEntry}
          toggleFav={(name)=>{this.toggleFavor(name)}}
          useCommOnToggle={true}
          onPress={(entry)=> {
            onCardPress(entry)
          }}
          onSwipe={this.updatedSwiped}
        >
        </Card>
      )
    }

    toggleFavor (commodity){
      const { removeFav ,addToFavs } = this.props
      let fav = this.checkFav(commodity)
      if(!fav) addToFavs(commodity) 
      else removeFav(commodity)
    }

    checkFav = (name) =>{
      const { favCommodities } = this.state
      return favCommodities && favCommodities.includes(name)
    }



    renderLoader (){

    }
    
    render () {
      let toggle = false
      const { focusedEntry, favCommodities } = this.state
      const { commsList , title,dateString } = this.props
    
      let sortedList = commsList || []

      if(commsList.length > 0){

        sortedList && sortedList.sort(function (a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
        
          return textA.localeCompare(textB);
        })
    
      }

      return (
        <View style={[styles.container, { backgroundColor : Colors.white }]}>
                    
          <View style={styles.tittleWrapper}>
            <View>
              <Text  font={Fonts.titleBold}>{title}</Text>
              <Text  font={Fonts.display}
                mt={1}>{dateString}
              </Text>
            </View>
                
            <Image height={Metrics.base * 6}
              resizeMode='contain'
              source={Images.logo}
              width={Metrics.base * 8}>
            </Image>

          </View>
          {sortedList && <ScrollView style={{ width:'100%' }}>
            {
              sortedList.map((entry) =>{
                toggle = !toggle
                return this.renderEntry(entry, toggle)
              })
            }
            </ScrollView> 
          }
        </View>    
        
      )
    }
}

const mapDispatchToProps = dispatch => ({
  addToFavs: payload => dispatch(addToFavourites(payload)),
  removeFav: payload => dispatch(removeFromFavourites(payload)),
  getFavs: () => dispatch(getFavourites()),
  filterComms: (name) => dispatch(FilterComms(name)),
  clearErrorMSg : () => dispatch(clearError()),
  clearCurrentCommData : () => dispatch(clearGraphData())
})
  
const mapStateToProps = state => ({
  state : state,
  favourites: state.dataReducer.favourites,
  commsObject : state.dataReducer.commoditiesObject,
  currentCommData : state.dataReducer.focusedCommTrend,
  error : state.dataReducer.error,
  currentCommName : state.dataReducer.currentCommName,
  isLoading : state.dataReducer.isLoading,
  dataRetrieved : state.dataReducer.dataRetrieved
})
  
export default connect(mapStateToProps,mapDispatchToProps)(ListView)

// FIXME: Use Metrics and Strings files, remove inline styles, remove unused comments and unused code.   

  

  