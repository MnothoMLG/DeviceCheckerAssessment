import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Platform} from 'react-native';
import Input from '../../components/Input';
import {Formik} from 'formik';
import {Margin} from '../../components/layout/layout';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {endLoading, startLoading} from '../../redux/modules/loading/actions';
import {Text} from '../../components';
import {globalValidationScheme} from '../../utils/Validation';
import flashMessage from '../../utils/showFlashMessage';
import firestore from '@react-native-firebase/firestore';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const usersCollection = firestore().collection('users');

export default function LoginScreen(): JSX.Element {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(null);
  async function signInWithPhoneNumber(phoneNumber: string) {
    dispatch(startLoading());
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (err) {
      console.log(' this error occured', {err});
      flashMessage('danger', 'An Error Occured');
    } finally {
      setTimeout(() => dispatch(endLoading()), 2000);
    }
  }

  async function confirmCode(code: string, number: string) {
    try {
      dispatch(startLoading());
      await confirm?.confirm(code);
      dispatch(endLoading());
    } catch (error) {
      console.log(' code error ', {error});
      flashMessage('danger', 'Invalid code');
      dispatch(endLoading());
    }
  }

  return (
    <>
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps={'handled'}
        enableResetScrollToCoords={false}
        extraHeight={Platform.OS === 'ios' ? -64 : undefined}
        testID={'scrollview'}
        contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <Formik
            initialValues={{number: '+27', code: ''}}
            onSubmit={() => {}}
            validationSchema={globalValidationScheme}>
            {({handleChange, setFieldTouched, touched, errors, values}) => (
              <>
                <Margin marginBottom={52}>
                  <Text styles={{text: {lineHeight: 20}}} align="center">
                    {confirm
                      ? `Enter the OTP sent by SMS to\n${values.number}`
                      : 'Enter your phone number to proceeed'}
                  </Text>
                </Margin>
                {confirm ? (
                  <Input
                    autoCapitalize="none"
                    style={styles.input}
                    placeholder={'OTP Code'}
                    label={'OTP Code'}
                    required
                    keyboardType="phone-pad"
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
                    keyboardType="phone-pad"
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
                      ? confirmCode(values.code, values.number)
                      : signInWithPhoneNumber(values.number);
                  }}
                  style={styles.continue}>
                  <Text styles={{text: [styles.text, styles.textBold]}}>
                    Continue
                  </Text>
                </TouchableOpacity>

                {confirm ? (
                  <TouchableOpacity
                    onPress={() => {
                      signInWithPhoneNumber(values.number);
                    }}>
                    <Text mt={2}> Didn't recieve code? Resend</Text>
                  </TouchableOpacity>
                ) : null}
              </>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
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
