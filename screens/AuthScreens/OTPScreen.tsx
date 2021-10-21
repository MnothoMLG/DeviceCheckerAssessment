import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Input from '../../components/Input';
import {Formik} from 'formik';
import {loginValidationSchema} from './Validation';
import {Margin} from '../../components/layout/layout';

import HeaderWrapper from '../../components/layout/back-screen';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/modules/auth/actions';

export default function OTPScreen({navigation, route}): JSX.Element {
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, []);
  const dispatch = useDispatch();
  return (
    <HeaderWrapper title={'OTP'}>
      <View style={styles.container}>
        <Margin marginBottom={52}>
          <Text>Enter the OTP sent by SMS to your phone number</Text>
        </Margin>
        <View style={styles.form}>
          <Formik
            initialValues={{otp: ''}}
            onSubmit={() => null}
            validationSchema={loginValidationSchema}>
            {({handleChange, setFieldTouched, touched, errors, values}) => (
              <>
                <Input
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="One Time Pin"
                  label="OTP"
                  required
                  editable={!loading}
                  onChangeText={handleChange('otp')}
                  onBlur={() => setFieldTouched('otp')}
                  value={values.otp}
                  error={errors.otp}
                  touched={touched.otp}
                />
                <Margin marginTop={52} />
                <TouchableOpacity
                  onPress={() => dispatch(login())}
                  style={styles.continue}>
                  <Text style={[styles.text, styles.textBold]}>Continue</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </View>
    </HeaderWrapper>
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
    backgroundColor: '#FF2D5580',
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
