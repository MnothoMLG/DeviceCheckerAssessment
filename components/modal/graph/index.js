import React,{ Component } from 'react'
import { View, Platform } from 'react-native'
import Images from '../../../assets/images'
import { Colors, Enums, Fonts, Metrics } from '../../../constants'
import { updateGeturePos} from '../../../actions/appActions'
import { iPhoneLarge } from '../../../utils/screenSize'
import { Button, Card, Graph , TestGraph } from '../../'
import Modal from '../general'
import styles from './styles'
import { connect } from 'react-redux'
class GraphModal extends Component {

    state = { height: '70%',
              showGraph :false ,
              onLandScape : false,
              orientantion : null,
              gestureX : null,
              graphRange : '1y'
            }

    _setHeight = () => {
      let height = '70%'
     
      setTimeout(()=> this.setState({showGraph : true }) , 500)
    }

    setRange(range){
      this.setState({graphRange : range})
    }

    renderGraphContent (){
      const { focusedEntry ,fav , onClosePress ,onFavPress } = this.props
      const { measure } = focusedEntry
      const { height, showGraph, onLandScape, graphRange } = this.state
      let imgW = fav ?  1.725 : 2.5
      const { base } = Metrics
      const iX = iPhoneLarge && Platform.OS === 'ios' 
     

      return [
        <View style={styles.graphContentWrapper}>    
          <View style={[styles.cardTopWrapper , onLandScape && {paddingTop: Metrics.base * 1.5 }]}>
          {showGraph && <Card
              scaleDown={onLandScape}
              clickable={false}
              entry={focusedEntry}
              rounded={false}
            >
            </Card>}
          </View>
          <View //{...this.panResponder.panHandlers} 
          style={[styles.graphWrapper, { height , width : '100%' } ]}>
    
            {showGraph && <Graph 
                graphRange={graphRange}
                updateGraphRange={(range) =>{
                  this.setRange(range)
                }}
                showGraph={showGraph}
                onLandScape={onLandScape}
                commodityMeasure={measure}
                entry={focusedEntry} 
              />}
          </View>
        
          <View style={[styles.bottomButtonBar , onLandScape&&{paddingTop : Metrics.base *1.5}]}>
             
              <Button 
                backgroundColor={Colors.overlayDark10} 
                font={Fonts.button} 
                height={ onLandScape ? base*4 : base * 4.5}
                icon={Images.crossFilled} 
                iconSize={2}
                label={'Close'} 
                ph={2}
                radius={2.25}
                textColor={Colors.secondarDarkGrey}
                width={base * 16.5} 
                onPress={()=>{
                  onClosePress()
                }} 
              />

            <Button 
              backgroundColor={fav ? Colors.secondayGreen : Colors.overlayDark10}
              font={Fonts.button} 
              height={ onLandScape ? base*4 : base * 4.5}
              icon={fav ? Images.star : Images.favourite} 
              iconSize={imgW}
              label={'Favourite'} 
              ph={2}
              radius={2.25}
              textColor={fav && Colors.white || Colors.secondarDarkGrey}
              width={base * 16.5} 
              onPress={()=>{
                onFavPress(focusedEntry)
              }} 
            />       
          </View>
        </View>
      ]
    }


    render (){
      const { visible , onRequestClose } = this.props
      
      return(
        <Modal
          animationType={'fade'}
          visible={visible}
          onRequestClose={()=>{
            onRequestClose && onRequestClose()
          }}
        >
          <View style={{ flex : 1, width : '100%' }}>
            {this.renderGraphContent()}
          </View>
        </Modal>
      )}
}

const mapDispatchToProps = dispatch => ({
  updateX : payload => dispatch(updateGeturePos(payload)),
})

export default connect(null,mapDispatchToProps)(GraphModal)

// FIXME: Remove inline styles
