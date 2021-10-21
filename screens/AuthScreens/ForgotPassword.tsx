import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PrimaryButton from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/Input';
import HeaderWrapper from '../../components/layout/back-screen';
import {Formik} from 'formik';
import {forgotPassValidationSchema} from './Validation';
import {Margin} from '../../components/layout/layout';

export default function LoginScreen({navigation, route}): JSX.Element {
  const router = useNavigation();

  const handlePasswordReset = () => {
  };

  return (
    <>
      <HeaderWrapper
        navigation={navigation}
        route={route}
        title={'Forgot Password'}
        useKeyboardScrollView={true}>
        <View style={[styles.container]}>
          <View style={styles.form}>
            <Text
              style={{
                ...styles.text,
                paddingTop: 50,
              }}>
              Please enter your email to get a password reset link
            </Text>
            <Formik
              initialValues={{email: ''}}
              onSubmit={() => {}}
              validationSchema={forgotPassValidationSchema}>
              {({
                handleChange,
                setFieldTouched,
                isValid,
                touched,
                errors,
                values,
              }) => (
                <>
                  <Margin marginTop={24} />
                  <Input
                    autoCompleteType="email"
                    autoCapitalize="none"
                    // accessoryLeft={(props) => <Icon {...props} name="email" />}
                    textContentType="emailAddress"
                    style={{}}
                    placeholder="Email address"
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                  />
                  <Margin marginTop={24} />
                  <PrimaryButton
                    disabled={!isValid}
                    text="SUBMIT"
                    type="primary"
                    onClick={() => handlePasswordReset(values)}
                  />
                </>
              )}
            </Formik>
          </View>
        </View>
      </HeaderWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 24,
  },
  form: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    marginVertical: 10,
    shadowColor: 'grey',
  },
  facebook: {
    backgroundColor: '#4267B2',
  },
  google: {
    backgroundColor: '#4C8BF5',
  },
  instagram: {
    backgroundColor: '#DD2A7B',
  },
  text: {
    color: '#747474',
    textAlign: 'center',
    marginBottom: 10,
  },
});
