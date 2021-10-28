import {StyleSheet} from 'react-native';
import {Colors, shadow} from '../../constants';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panic: {
    width: 200,
    height: 200,
    borderWidth: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FF2D55',
    borderRadius: 100,
  },
  categoriesList: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 140,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  top: {
    backgroundColor: Colors.white,
    height: 100,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  listing: {
    backgroundColor: Colors.white,
    borderRadius: 22,
    paddingTop: 18,
    paddingBottom: 42,
    marginBottom: 16,
    ...shadow,
  },
  description: {
    height: 42,
    paddingHorizontal: 12,
    borderRadius: 20,
    color: 'rgba(0,0,0,0.7)',
    textAlign: 'center',
  },
  popularCategories: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: 110,
    height: 110,
    marginRight: 12,
  },
  popularText: {marginTop: 8, fontSize: 13, fontWeight: 'bold'},
});

export default styles;
