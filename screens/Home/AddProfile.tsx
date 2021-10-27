import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Input from '../../components/Input';
import {Formik} from 'formik';
import {Margin} from '../../components/layout/layout';
import HeaderWrapper from '../../components/layout/back-screen';

export default function AddProfile(props: {
  updateProfile: any;
  closeModal: any;
}): JSX.Element {
  const {closeModal, updateProfile} = props;

  return (
    <HeaderWrapper
      hideback
      onBackPress={() => closeModal && closeModal()}
      title={'Profile Details'}>
      <View style={styles.container}>
        <Margin marginBottom={52}>
          <Text>Tell us about you</Text>
        </Margin>
        <View style={styles.form}>
          <Formik initialValues={{number: '', name: ''}} onSubmit={() => null}>
            {({
              handleChange,
              setFieldTouched,
              touched,
              isValid,
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
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                  value={values.name}
                  error={errors.name}
                  touched={touched.name}
                />
                <Margin marginTop={16} />
                <Margin marginTop={52} />
                <TouchableOpacity
                  disabled={!isValid}
                  onPress={() => {
                    //to move to a saga
                    updateProfile && updateProfile(values.name);
                    closeModal && closeModal();
                  }}
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
