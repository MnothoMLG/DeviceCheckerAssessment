import {StyleSheet} from 'react-native';
import {colors} from '../../theme';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.background.bgDark,
    paddingTop: 42,
  },
  loginButtonsContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 40,
  },
  registerButtonsContainer: {
    marginTop: 30,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  form: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    width: '100%',
    padding: 10,
    height: 42,
  },
  button: {
    width: '100%',
    marginVertical: 10,
    shadowColor: 'grey',
  },
  socialButtons: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    marginVertical: 10,
    color: '#fff',
  },
  linkText: {
    color: '#4C8BF5',
    marginTop: 20,
  },
  textBold: {
    fontWeight: 'bold',
  },
  logo: {
    width: '80%',
    height: 150,
    marginBottom: 20,
    marginTop: 20,
  },
});

export default styles;
