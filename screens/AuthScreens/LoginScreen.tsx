import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Input from '../../components/Input';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {loginValidationSchema} from './Validation';
import {Margin} from '../../components/layout/layout';
import {updateProfile} from '../../redux/modules/auth/actions';
import {useDispatch} from 'react-redux';

export default function LoginScreen(): JSX.Element {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  async function signInWithPhoneNumber(phoneNumber : string) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    storeNumber(phoneNumber);
    navigation.navigate('OTPScreen');

  }

  async function confirmCode() {
    try {
      await confirm?.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  const storeNumber = (number: string) => dispatch(updateProfile({number}));
  return (
    <View style={styles.container}>
      <Margin marginBottom={52}>
        <Text>Enter your phone number to proceeed</Text>
      </Margin>
      <View style={styles.form}>
        <Formik
          initialValues={{number: '', password: ''}}
          onSubmit={() => null}
          validationSchema={loginValidationSchema}>
          {({handleChange, setFieldTouched, touched, errors, values}) => (
            <>
              <Input
                autoCapitalize="none"
                style={styles.input}
                placeholder="+27"
                label="Mobile Number"
                required
                onChangeText={handleChange('number')}
                onBlur={() => setFieldTouched('number')}
                value={values.number}
                error={errors.number}
                touched={touched.number}
              />
              <Margin marginTop={52} />
              <TouchableOpacity
                onPress={() => {
                  signInWithPhoneNumber('+1 650-555-3434')}

                }}
                style={styles.continue}>
                <Text style={[styles.text, styles.textBold]}>Continue</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
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
