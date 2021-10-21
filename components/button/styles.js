import { StyleSheet } from 'react-native'

import { Colors, Metrics } from '../../constants'

export default StyleSheet.create({
  buttonIconContainer: {
    alignItems: 'center'
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  iconLeft: {
    marginRight: Metrics.base / 2
  },
  iconRight: {
    marginLeft: Metrics.base / 2
  },
  mainContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  overlayContainer :{
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlayDark30,  
    zIndex: 1
  },
  text: {
    flex: 1
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '70%'
  }
})
