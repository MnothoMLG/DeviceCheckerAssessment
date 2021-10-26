import { StyleSheet } from 'react-native'
import {Fonts, Metrics} from '../../constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#FF2D55',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    marginTop: Metrics.base * 5,
    marginBottom: Metrics.base * 4.5,
    paddingHorizontal: Metrics.base * 3,
    paddingVertical: 20,
  }
})

export default styles;
