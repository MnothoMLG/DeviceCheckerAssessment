import { StyleSheet } from 'react-native'

import { Metrics } from '../../constants'

export default StyleSheet.create({
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
  text: {
    flex: 1
  }
})
