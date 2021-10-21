import React, { Component } from 'react'
import Svg,{ Circle, Defs, G, Line, LinearGradient, Path, Rect, Text as SVGText, Stop } from 'react-native-svg'
import { Text } from '..'
import {Dimensions , View} from 'react-native'
import { Colors, Fonts,Enums, Metrics } from '../../constants'
import { connect } from 'react-redux'
import {  updateGeturePos} from '../../actions/appActions'
import styles from './styles'

const {width} = Metrics.window
let toolTipDisplayValue = 0

  const Gradient = ({ index , showGradient , panResponder}) => (
    <Defs key={index} >
      <LinearGradient
       id='gradient'
        x1={0}
        x2={0}
        y1='0'
        y2='220' >
        <Stop offset='100%'
          stopColor={showGradient ? Colors.secondayGreen : Colors.white}
          stopOpacity='0.1' />
        <Stop offset='0%'
          stopColor={showGradient ? Colors.secondayGreen : Colors.white}
          stopOpacity='1' />
      </LinearGradient>
    </Defs>
  )
  
  
  const PathLine = ({ line ,onPress, panResponder, showGraph ,onLandScape, deviceHeight, duration }) => (
  
        <Path
          key={ 'dashed-line' }
          stroke={Colors.secondayGreen }
          d={ line }
          fill={ 'none' }
          strokeWidth={1.75}          
        />
  
      // <AnimatedSVGPath
      // {...panResponder.panHandlers}
      //   d={showGraph ? line : []}
      //   fill={'none'}
      //   key={ 'dashed-line' }
      //   delay={200}
      //   duration={duration}
      //   loop={false}
      //   //scale={1}
      //   width={1000}
      //   //width={ deviceHeight }//Metrics.window.height }
      //   strokeColor={Colors.secondayGreen}
      //   strokeWidth={1}
      // />
  )

  class TooltipObj extends Component {   

    render() {
      const {gestureX , viewWidth, onLandScape , decoratorScreenOffset} = this.props
      console.log("onLandscape ? ", onLandScape , Dimensions.get('window'))
      const {width} = Dimensions.get('window')
      let showTip = gestureX && (gestureX >= decoratorScreenOffset) && (width - gestureX >=14)
        return(
         showTip && <View style={[styles.toolTipStyles , { left : gestureX - Metrics.base * 3} , onLandScape && {height : Metrics.base *2}]}>
            <Text font={onLandScape ? Fonts.tiny : Fonts.caption} >{toolTipDisplayValue}</Text>
          </View>
        )
    }
  }


  class CursorLineObj extends Component {   

    render() {
      const {gestureX,decoratorScreenOffset} = this.props
      console.log(" the difference g then off " , gestureX, decoratorScreenOffset, "width", width)
        return(
            <Line
              key={"line"}
              stroke={Colors.black}
              x1={gestureX - decoratorScreenOffset}
              x2={gestureX - decoratorScreenOffset}
              y1={'0%'}
              y2={'100%'}
            />
        )
    }
  }
  
  class DecoratorObj extends Component {   
  
    myComponents=[]
    xOff=null
  
    componentDidMount() {

       setTimeout(()=> this.measureMe() ,20 )    

    }
  
    measureMe(){
      const {setDecoratorsOffset } = this.props
      let elt = this.myComponents[0] 
      elt && elt.measure((fx, fy, width, height, px, py) => {
            this.xOff = px
             setDecoratorsOffset(px)         
          })
    }
  
    componentDidUpdate(){
    }
    render() {
      const { x, y, data ,gestureX,selectedRange} = this.props
      return data.map((value, index) => { //render Decor   
        
        let pointPos = (x(index) + this.xOff)
        let showMe = (gestureX && (Math.abs(gestureX -(pointPos))) <= 0.5) 
        if (showMe) toolTipDisplayValue = (value)

        return(
    
            <Svg 
              key={index}
              width="100%"
              height="100%"
              ref={ref =>  this.myComponents[index] = ref }         
            >
              <Circle
                animate
                cx={x(index)}
                cy={y(value)}
                fill={showMe ? Colors.secondayGreen : Colors.transparent}
                key={index}
                r={6}
                stroke={ showMe ? Colors.secondayGreen :  Colors.transparent}
              />   
            </Svg>
        )
      })
    }
  }
    
  const rad = (min,max) => {
    return Math.random() * (+max - +min) + +min 
  }
  
  const filterCondtions = (range,index, datalen) => {
    switch (range) {
    
    case '1w':
      let plotPts = [ 0, Math.round(datalen/4), Math.round(datalen/((2))), Math.round(datalen -1) ]
      return plotPts.includes(index)
  
    case '1m': 
        plotPts = [ 0, Math.round(datalen/4), Math.round(datalen/2), Math.round(datalen/((4/3))), Math.round(datalen -1) ]
      return plotPts.includes(index)
      
    case '1y': 
      plotPts = [ 0, Math.round(datalen/4), Math.round(datalen/2),Math.round(datalen/((4/3))), Math.round(datalen -1) ]
      return plotPts.includes(index)
    case '5y':
      plotPts = [ 0, Math.round(datalen/4), Math.round(datalen/2), Math.round(datalen/((4/3))), Math.round(datalen -1) ]
      return plotPts.includes(index)
    case '10y':
      plotPts = [ 0, Math.round(datalen/4), Math.round(datalen/((4/3))),Math.round(datalen/2) , Math.round(datalen -1) ]
      return plotPts.includes(index)
    default:
      return true
    } 
         
  }
  const rangeLabels = { '1W' : 'Day','1M' : 'Day', '1Y':'Month', '5Y': 'Year', '10Y':'Year' }
  const rangeScales = { '10y' : 90, '5y' : 60 ,'1y': 30 }

  
  class CustomGridObj extends Component{

      state = { 
        gestureX : null
      }

    render(){    
        const { x, y, data, ticks,filterby = 1,xCords } = this.props
        var gridPoints = (data.length >7) ? ticks.filter(function(val,index) {
          let len = ticks.length
          let plotPts = [ Math.round(len/4), Math.round(len/(4/3)), Math.round(len/2) ]

          return plotPts.includes(index)

        }) : data

        var xPoints = (xCords.length >7) ? xCords.filter(function(val,index) {
          let len = xCords.length
          let plotPts = [ Math.round(len/4), Math.round(len/(4/3)), Math.round(len/2) ]
          return plotPts.includes(index)

        }) : xCords

        return <G >
          {
            ticks.map((tick,index) => {
              let showTick = gridPoints.includes(tick) //only show grids of the values in graph         
              return showTick ? <Line 
                stroke={'rgba(0,0,0,0.1)'}
                x1={'0%'}
                x2={'100%'}
                y1={y(tick)}
                y2={y(tick)}
                          
              /> : <Line 
                    stroke={'rgba(0,0,0,0.1)'}
                    x1={'0%'}
                    x2={'100%'}
                    y1={y(tick)}
                    y2={y(tick)}
                              
                    />
            })
          }
          {
            
            data.map((yValue, index) => {      //xpos px in graph
              
              let showLine = xPoints.includes(xCords[index])
              return showLine && <Line
                key={index}
                stroke={'rgba(0,0,0,0.1)'}
                x1={x(index)} 
                x2={x(index)} 
                y1={'0%'}
                y2={'100%'}
              />
            })
          }
              </G>
      }

}


const mapDispatchToProps = dispatch => ({
  updateX : payload => dispatch(updateGeturePos(payload)),
 
})


const mapStateToProps = state => ({

  gestureX : state.cursorReducer.gestureX,
  deviceWidth :  state.dataReducer.deviceWidth,
  deviceHeight:  state.dataReducer.deviceHeight

})
const Decorator = connect(mapStateToProps)(DecoratorObj)
const CursorLine = connect(mapStateToProps)(CursorLineObj)
const CustomGrid = connect(mapStateToProps,mapDispatchToProps)(CustomGridObj)
const Tooltip = connect(mapStateToProps)(TooltipObj)


export {
      PathLine ,
      CustomGrid,
      Gradient,
      rad,
      Tooltip,
      CursorLine,
      Decorator,
      filterCondtions,
      rangeLabels,
      rangeScales, 

  }