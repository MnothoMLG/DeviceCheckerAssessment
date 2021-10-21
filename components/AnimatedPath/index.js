import PropTypes from 'prop-types'
import React, {
  Component,
  PureComponent
} from 'react'
import {
  Animated,
  Dimensions
} from 'react-native'
import Svg from 'react-native-svg'
import {
  svgPathProperties
} from 'svg-path-properties'

import Path from '../AnimatedSVG'

const { height, width } = Dimensions.get('window')
class AnimatedSVGPath extends Component {
    static propTypes = {
      d: PropTypes.string.isRequired,
      delay: PropTypes.number,
      duration: PropTypes.number,
      fill: PropTypes.string,
      height: PropTypes.number,
      loop: PropTypes.bool,
      scale: PropTypes.number,
      strokeColor: PropTypes.string,
      strokeWidth: PropTypes.number,
      width: PropTypes.number
    };
    
    static defaultProps = {
      strokeColor: 'black',
      strokeWidth: 1,
      duration: 1000,
      delay: 1000,
      fill: 'none',
      scale: 1,
      height,
      width,
      loop: true
    };
    
    constructor (props) {
      super(props)
      const { d } = this.props
      const properties = svgPathProperties(d)
      this.length = properties.getTotalLength()
      this.strokeDashoffset = new Animated.Value(this.length)
    }
  
    animate = () => {
      const {
        delay,
        duration,
        loop
      } = this.props
      this.strokeDashoffset.setValue(this.length)
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(this.strokeDashoffset, {
          toValue: 0,
          duration: duration
        })
      ]).start(() => {
        if (loop) {
          this.animate()
        }
      })
    }
  
    componentDidMount () {
      this.animate()
    }
    
    render () {
      const {
        d,
        fill,
        scale,
        width,
        height,
        strokeColor,
        strokeWidth
      } = this.props
      return (
        <Svg
          height={(height * scale) + 5}
          width={(width * scale) + 5}
        >
          <Path
            d={d}
            fill={fill}
            scale={scale}
            stroke={strokeColor}
            strokeDasharray={[this.length, this.length]}
            strokeDashoffset={this.strokeDashoffset}
            strokeWidth={strokeWidth}
          />
        </Svg>
      )
    }
}
  
/* Export ==================================================================== */
  
module.exports = AnimatedSVGPath
module.exports.details = {
  title: 'AnimatedSVGPath'
}

// FIXME: Use Metrics file