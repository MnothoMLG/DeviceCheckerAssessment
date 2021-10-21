import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import PrimaryButton from '../../components/Button';
import Input from '../../components/Input';
import {registerValidationSchema} from './Validation';
import {Formik} from 'formik';
import {Margin, Row} from '../../components/layout/layout';
import HeaderWrapper from '../../components/layout/back-screen';

export default function RegistrationScreen(props): JSX.Element {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);


  const handleRegistration = () => {};

  return (
    <React.Fragment key={'reg'}>
      <HeaderWrapper
        navigation={props.navigation}
        title={'Register'}
        useKeyboardScrollView={true}
        hideback={loading}>
        <View style={[styles.container]}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.form}>
            <Formik
              enableReinitialize
              initialValues={{
                email: '',
                name: '',
                password: '',
                confirmPassword: '',
              }}
              onSubmit={() => {
                return;
              }}
              validationSchema={registerValidationSchema}>
              {({
                handleChange,
                setFieldTouched,
                setFieldValue,
                touched,
                isValid,
                errors,
                values,
              }) => (
                <>
                  <Input
                    autoCompleteType="name"
                    required
                    style={styles.input}
                    placeholder="Your name"
                    onChangeText={handleChange('name')}
                    onBlur={() => setFieldTouched('name')}
                    value={values.name}
                    error={errors.name}
                    touched={touched.name}
                  />
                  <Input
                    autoCompleteType="email"
                    required
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                    value={values.email}
                    editable={!loading}
                    error={errors.email}
                    touched={touched.email}
                  />
                  <Input
                    autoCompleteType="password"
                    textContentType="password"
                    secureTextEntry={visible}
                    required
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    value={values.password}
                    editable={!loading}
                    error={errors.password}
                    touched={touched.password}
                  />
                  <Input
                    autoCompleteType="password"
                    textContentType="newPassword"
                    secureTextEntry={visible}
                    required
                    editable={!loading}
                    style={styles.input}
                    placeholder="Confirm Password"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={() => setFieldTouched('confirmPassword')}
                    value={values.confirmPassword}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                  />
                  <Margin marginTop={40} />
                  <PrimaryButton
                    text="SUBMIT"
                    loading={loading}
                    disabled={!isValid}
                    type="primary"
                    onClick={() => handleRegistration(values)}
                  />
                  <Text style={styles.text}>or register with</Text>
                  <Row alignHorizontal="space-between">

           
                  </Row>
                </>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </View>
      </HeaderWrapper>
    </React.Fragment>
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
  input: {
    marginTop: 24,
    width: '100%',
    padding: 10,
  },
  text: {
    marginTop: 40,
    marginBottom: 10,
    color: '#747474',
  },
  button: {
    width: '100%',
    marginVertical: 15,
    shadowColor: 'grey',
  },
});
