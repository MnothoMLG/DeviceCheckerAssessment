import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
import fonts from '../../constants/fonts';

const styles = StyleSheet.create({

  wrapper: {
    width: '100%',
    height: 84,
    padding: 16,
    justifyContent: 'space-between',
  },
  logoWrapper: {
    marginTop: 2,
    height: 24,
    justifyContent: 'center',
  },
  editHeader: {
    backgroundColor: Colors.white,
    height: 54,
  },
  content: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  primaryImageSize: {
    width: 24,
    height: 24,
  },
  secondaryImageSize: {
    width: 20,
    height: 16,
  },
  flexRow: {
    flexDirection: 'row',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editHeaderHeading: {
    color: Colors.black,
    ...fonts.headingBold,
  },
  backImageSize: {
    width: 16,
    justifyContent: 'center',
    height: 16,
  },
  justifyContent: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: Colors.white,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 15,
  },
  iconContainer: {
    flex: 0.2,
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 0.6,
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'roboto',
    lineHeight: 21,
    fontWeight: 'bold',
  },
});

export default styles;
