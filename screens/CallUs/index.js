import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { Linking } from 'react-native'

import Images from '../../assets/images'
import { Cell, Text } from '../../components'
import { Colors, Fonts, Metrics } from '../../constants'
import contacts from './contacts'
import styles from './styles'

class CallUs extends Component {
  constructor (props) {
    super(props)
  }

  launchPhoneClient (phoneNumber){
    Linking.openURL(`tel:${phoneNumber}`)
  }
    renderCards = (region) => {

      let nums = []
      for (key in region){
        return(
          <View style={styles.cardsWrapper}>
            <Cell noBorder
              fontLeft={Fonts.displayBold}
              mb={1.25}
              textLeft={key}>
            </Cell>
            { region[key].map(({ name ,number })=>{
              return <View style={styles.cellBorder}> 
                <Cell 
                  noBorder 
                  fontLeft={Fonts.headingBold}
                  fontRight={Fonts.heading} 
                  textLeft={name} 
                  textLeftColor={Colors.formHightlight} 
                  textRight={number} 
                  textRightColor={Colors.formHightlight} 
                  onPress={()=> this.launchPhoneClient(number.replace(/\s+/g, ''))}
                               
                />
                     </View>
            })}
          </View>
        )
      }

    }

    render () {

      return ( 
        <View style={{ flex: 1 }}>
          <Text font={Fonts.titleBold}
            mh={2.25}
            mv={5}>Call us
          </Text>
          <ScrollView>
            <View style={{ flex:1 }}>
              {contacts.map(region=>{
                return this.renderCards(region)
              })}
            </View>
          </ScrollView>
        </View>
      )
    }
}



export default CallUs



// bold, 
// contentCenter,
// contentLeft,
// contentRight,
// fontCenter,
// fontLeft,
// fontRight,
// imageCenter,
// imageHeight,
// imageLeft,
// imageRight,
// imageWidth,
// numberOfLines,
// textFont,
// textCenter,
// textCenterColor,
// textLeft,
// textLeftColor,
// textRight,
// textRightColor

// FIXME: Remove comments, unused imports and inline styles.