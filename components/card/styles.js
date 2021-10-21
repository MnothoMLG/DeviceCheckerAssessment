import {StyleSheet} from 'react-native';

import {Colors, Metrics} from '../../constants';

export default StyleSheet.create({
  btnWrapper: {
    height: 42,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 200,
  },
  changeWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  favButtonText: {
    alignItems: 'center',
    width: '100%',
  },
  favouriteButton: {
    alignItems: 'center',
    backgroundColor: Colors.secondayGreen,
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 2,
  },
  indicatorWrapper: {
    alignItems: 'center',
    borderRadius: 11,
    height: 22,
    width: 22,
  },
  rowSpaced: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  starContainer: {
    alignItems: 'flex-end',
    backgroundColor: Colors.transparent,
    height: Metrics.base * 2,
    paddingRight: Metrics.base * 0.5,
    paddingTop: Metrics.base * 0.5,
    position: 'absolute',
    right: 0,
    width: '100%',
  },
  tittleWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: Metrics.base,
  },
});
