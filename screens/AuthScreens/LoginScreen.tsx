import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Input from '../../components/Input';
import {Formik} from 'formik';
import {loginValidationSchema} from './Validation';
import {Margin} from '../../components/layout/layout';
import auth from '@react-native-firebase/auth';
import {login, updateProfile} from '../../redux/modules/auth/actions';
import {useDispatch, useSelector} from 'react-redux';
import {endLoading, startLoading} from '../../redux/modules/loading/actions';
import {Text} from '../../components';

export default function LoginScreen(): JSX.Element {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(null);
  const profile = useSelector(state => state.authReducer.profile);

  async function signInWithPhoneNumber(phoneNumber: string) {
    dispatch(startLoading());
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    storeNumber(phoneNumber);
    dispatch(endLoading());
  }

  async function confirmCode(code: string) {
    try {
      dispatch(startLoading());
      await confirm?.confirm(code);
      dispatch(login());
      dispatch(endLoading());
    } catch (error) {
      console.log('Invalid code.'); //flash message
      dispatch(endLoading());
    }
  }

  const storeNumber = (number: string) =>
    dispatch(updateProfile({number, name: ''}));

  return (
    <>
      <View style={styles.container}>
        <Margin marginBottom={52}>
          <Text>
            {confirm
              ? `Enter the OTP sent by SMS to\n${profile.number}`
              : 'Enter your phone number to proceeed'}
          </Text>
        </Margin>
        <View style={styles.form}>
          <Formik
            initialValues={{number: '', code: ''}}
            onSubmit={() => null}
            validationSchema={loginValidationSchema}>
            {({handleChange, setFieldTouched, touched, errors, values}) => (
              <>
                <Input
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder={confirm ? 'OTP Code' : '+27'}
                  label={confirm ? 'OTP Code' : 'Mobile Number'}
                  required
                  onChangeText={handleChange(confirm ? 'code' : 'number')}
                  onBlur={() => setFieldTouched(confirm ? 'code' : 'number')}
                  value={confirm ? values.code : values.number}
                  error={confirm ? errors.code : errors.number}
                  touched={confirm ? touched.code : touched.number}
                />
                <Margin marginTop={52} />
                <TouchableOpacity
                  onPress={() => {
                    confirm
                      ? confirmCode(values.code)
                      : signInWithPhoneNumber('+27680189920');
                  }}
                  style={styles.continue}>
                  <Text style={[styles.text, styles.textBold]}>Continue</Text>
                </TouchableOpacity>

                <Text mt={2}> Didn't recieve code? Resend</Text>
              </>
            )}
          </Formik>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 100,
  },
  loginButtonsContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 40,
  },
  continue: {
    height: 42,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF2D55',
    borderRadius: 5,
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
