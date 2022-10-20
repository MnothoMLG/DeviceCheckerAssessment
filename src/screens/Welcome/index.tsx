import React, {FC} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Input from '../../components/Input';
import {Formik} from 'formik';
import {Margin} from '../../components/layout/layout';
// import HeaderWrapper from '../../components/layout/back-screen';
import {globalValidationScheme} from '../../utils/Validation';

const Welcome: React.FC = () => {
  return (
    // <HeaderWrapper
    //   useKeyboardScrollView
    //   onBackPress={() => {}}
    //   title={'Welcome'}>
    <View style={styles.container}>
      <Margin marginBottom={52}>
        <Text>{"What's your name"}</Text>
      </Margin>
      <View style={styles.form}>
        <Formik
          initialValues={{
            name: '',
          }}
          onSubmit={() => {}}
          validationSchema={globalValidationScheme}>
          {({
            handleChange,
            setFieldTouched,
            isValid,
            touched,
            errors,
            values,
          }) => (
            <>
              <Input
                autoCapitalize="none"
                style={styles.input}
                placeholder="Name"
                label="Name"
                required
                maxLength={12}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
                value={values.name}
                error={errors.name}
                touched={touched.name}
              />
              <Margin marginTop={16} />
              <TouchableOpacity
                // disabled={!isValid}
                onPress={() => {}}
                style={styles.continue}>
                <Text style={[styles.text, styles.textBold]}>Continue</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
    // </HeaderWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 42,
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
