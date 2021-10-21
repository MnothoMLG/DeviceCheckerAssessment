import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Image, Modal, ScrollView, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import Swipeout from 'react-native-swipeout'

import Images from '../../assets/images'
import { Colors, Fonts, Metrics } from '../../constants'
import { Graph, Text } from '../'
import Styles from './styles'
import styles from './styles'

const { width, height } = Metrics.window
//The following code executes inside one of your component's methods, post render

const roundedOff = (num, decimals = 2) => { 
  if (Number((num)) % 1 === 0) return Number(num) //leaves ints as is
  return Number((num)).toFixed(decimals)

}
export default class Card extends Component{

    state = {
      currentPosition : null, 
      pressed : false,
      closed : false
    }

    componentDidMount (){
    }

    renderContent (){
      const { rounded ,commodityfont, entry,key, bgColor = Colors.focusColor, indicateFavourite,focusedEntry,fav ,clickable, onPress, scaleDown } = this.props
      const { name ,price ,measure, changePercentage } = entry
      const { currentPosition } = this.state
      let focused = (focusedEntry === entry)
      let titleFont =  commodityfont || Fonts.displayBold
      const up = changePercentage >= 0
      let color
      let image
      if(Number(changePercentage) > 0) {
        image = Images.up
        color = Colors.secondayGreen 
      }
      else if(Number(changePercentage) < 0) {
        image = Images.down
        color = Colors.tetiaryRed
      } else {
        color = Colors.orange
      }
        
      return (entry!== null) && <TouchableHighlight 
        disabled={!clickable}
        key={key}
        ref='button'
        style={{ width :'100%' }}
        underlayColor={Colors.transparent}
        onPress={()=> {
          onPress(entry)
        }}
      >
        <View                       
          style={[Styles.cardWrapper,{ height : scaleDown ? 40 : 82 ,borderRadius : rounded ? Metrics.base : 0,backgroundColor : bgColor  }]}>
          <View style={Styles.starContainer}>
            {(indicateFavourite && (fav === true)) && <Image source={Images.favouriteActive}
              style={{ width : Metrics.base * 2,height:Metrics.base * 2 }}>
                                                      </Image>}
          </View>
          <View style={styles.rowSpaced}>
            <View style={[{ justifyContent: 'center'} , scaleDown && {flexDirection : 'row', alignContent :'center' }]}>
              <Text font={scaleDown ? Fonts.buttonBold : titleFont}
              mt={scaleDown ? 0.25 : 0}
                mb={scaleDown ? 0 : 0.5}>{name.toUpperCase()}
              </Text>
              <View style={Styles.changeWrapper }>
                <View style={[Styles.indicatorWrapper, { backgroundColor: color }, scaleDown && {marginLeft : Metrics.base}]} >
                  <Image source={image}
                    style={{ width :  12, height :  12, marginTop : up ? 4 : 6 }}/>
                </View> 
                <Text font={scaleDown ? Fonts.tinyBold : Fonts.captionBold}
                  ml={0.5}>{`${changePercentage}%`}
                </Text>
              </View>    
                        
            </View>
            <View style={[Styles.tittleWrapper, scaleDown && {flexDirection : 'row', alignItems : 'center'}]}>
              <Text font={ scaleDown ? Fonts.captionBold : Fonts.titleBold}>{ roundedOff(price,2)}</Text>
              <Text ml={scaleDown ?  1 :0} font={scaleDown ? Fonts.tiny : Fonts.caption}>
                {`USD/${measure}`}
              </Text>
            </View>    
          </View>
                           
        </View>
                      </TouchableHighlight>    
    }
    
    render (){
      const { toggleFav, entry,useCommOnToggle ,bgColor = Colors.focusColor,fav ,clickable,currentlySwiped,onSwipe,onPress } = this.props
      const { pressed , closed } = this.state
      const { name } = entry
      let swipeBtns = [{
        backgroundColor: 'transparent',
        onPress: () => {
               
        },
        component: 
            <TouchableOpacity 
              onPress={()=>{
                this.setState({ pressed : true })
                toggleFav(name)
              }}

            >
            
              <View
                style={Styles.favouriteButton}>

                <Image source={fav ? Images.whiteStar : Images.unfavStar}
                  style={{ width: 20 , height : 20 }}/>
                        
                <View style={Styles.favButtonText}>
                  <Text
                    color={Colors.white}
                    font={Fonts.caption}
                    mt={0.5}
                  >Favourite
                  </Text>
                </View>
                    
              </View>
            </TouchableOpacity>
      }]

      return !clickable ?
        this.renderContent()
        :
        <Swipeout autoClose 
          backgroundColor='transparent'

          close={pressed || (currentlySwiped !== name)}
          right={swipeBtns}
          onClose={()=> { 
            //if currently here
            if(currentlySwiped === name){

              onSwipe('')
              this.setState({ closed : true })
            }
   
          }}
          onOpen={()=> {

            this.setState({ pressed : false })
            onSwipe(name)
          }}
        >
          {this.renderContent()}
        </Swipeout>


    }
}

// FIXME: Use Metrics files, remove inline styles and remove unused comments.