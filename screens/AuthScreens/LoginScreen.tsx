import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Input from '../../components/Input';
import {Formik} from 'formik';
import {Margin} from '../../components/layout/layout';
import auth from '@react-native-firebase/auth';
import {login, updateProfile} from '../../redux/modules/auth/actions';
import {useDispatch, useSelector} from 'react-redux';
import {endLoading, startLoading} from '../../redux/modules/loading/actions';
import {Text} from '../../components';
import {globalValidationScheme} from '../../utils/Validation';
import flashMessage from '../../utils/showFlashMessage';

export default function LoginScreen(): JSX.Element {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(null);
  const profile = useSelector(state => state.authReducer.profile);

  async function signInWithPhoneNumber(phoneNumber: string) {
    dispatch(startLoading());
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      storeNumber(phoneNumber);
    } catch {
      flashMessage('danger', 'An Error Occured');
    } finally {
      setTimeout(() => dispatch(endLoading()), 2000);
    }
  }

  async function confirmCode(code: string) {
    try {
      dispatch(startLoading());
      await confirm?.confirm(code);
      dispatch(login());
      dispatch(endLoading());
    } catch (error) {
      flashMessage('danger', 'Invalid code');
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
            validationSchema={globalValidationScheme}>
            {({handleChange, setFieldTouched, touched, errors, values}) => (
              <>
                {confirm ? (
                  <Input
                    autoCapitalize="none"
                    style={styles.input}
                    placeholder={'OTP Code'}
                    label={'OTP Code'}
                    required
                    onChangeText={handleChange('code')}
                    onBlur={() => setFieldTouched('code')}
                    value={values.code}
                    error={errors.code}
                    touched={touched.code}
                  />
                ) : (
                  <Input
                    autoCapitalize="none"
                    style={styles.input}
                    placeholder={'+27'}
                    maxLength={12}
                    label={'Mobile Number'}
                    required
                    onChangeText={handleChange('number')}
                    onBlur={() => setFieldTouched('number')}
                    value={values.number}
                    error={errors.number}
                    touched={touched.number}
                  />
                )}
                <Margin marginTop={52} />
                <TouchableOpacity
                  onPress={() => {
                    confirm
                      ? confirmCode(values.code)
                      : signInWithPhoneNumber(values.number);
                  }}
                  style={styles.continue}>
                  <Text styles={{text: [styles.text, styles.textBold]}}>
                    Continue
                  </Text>
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
