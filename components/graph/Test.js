import React, {Component} from 'react';
import Svg, {Path, Circle, G, Text} from 'react-native-svg';

class CircularSlider extends Component {
  render() {
    return (
      <Svg x={50} y={40} height="100" width="100">
        <Circle cx="40" cy="40" r="50" fill="pink" />
      </Svg>
    );
  }
}

export default CircularSlider;
