import React from 'react';
import Svg, {G, Polygon, Path, SvgProps} from 'react-native-svg';

const BackIcon = (props, ref) => (
  <Svg width="8.998" height="15.051" viewBox="0 0 8.998 15.051">
    <G transform="translate(0.5 0.551)">
      <Path
        fill={props.fill || "#000"}
        strokeWidth={2}
        stroke={props.fill || "#000"}
        d="M7.554,14a.484.484,0,0,1-.311-.131L.133,7.306a.418.418,0,0,1,0-.613L7.243.131a.434.434,0,0,1,.622,0,.418.418,0,0,1,0,.612L1.111,7l6.754,6.256a.418.418,0,0,1,0,.613A.406.406,0,0,1,7.554,14Z"
      />
    </G>
  </Svg>
);

export default BackIcon;
