import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../constants';
const shadow = {
  shadowColor: '#000000',
  shadowOpacity: 0.175,
  shadowRadius: 10,
  shadowOffset: {
    height: 0,
    width: 0,
  },
  elevation: 10,
};

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    height: 132,
    backgroundColor: '#fff',
    alignSelf: 'center',
    ...shadow,
    borderRadius: 5,
  },
  openClosed: {
    minWidth: 50,
    height: 20,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: Colors.secondayGreen,
  },
  reach: {
    width: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 32,
  },
  detail: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratings: {height: 30, flexDirection: 'row', alignItems: 'center'},
  wrapper: {
    height: '100%',
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
  actionWrapper: {
    width: 32,
    height: 32,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: Colors.tetiaryRed,
    borderRadius: 4,
  },
});
