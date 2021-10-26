import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Input from '../../components/Input';
import {Formik} from 'formik';
import {loginValidationSchema} from './Validation';
import {Margin} from '../../components/layout/layout';
import HeaderWrapper from '../../components/layout/back-screen';
import {addContact} from '../../redux/modules/contacts/actions';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
const usersCollection = firestore().collection('users');

export default function AddContact(props: {closeModal: any}): JSX.Element {
  const dispatch = useDispatch();
  const {closeModal} = props;
  const {contacts, profile} = useSelector(state => ({
    contacts: state.contactsReducer.contacts,
    profile: state.authReducer.profile,
  }));
  const {number} = profile;
  const updateDetails = (contacts: any[], newContact: any) => {
    usersCollection
      .doc(number)
      .update({contacts})
      .then(() => {
        dispatch(addContact(newContact));
      });
  };
  return (
    <HeaderWrapper
      onBackPress={() => closeModal && closeModal()}
      title={'New Contact'}>
      <View style={styles.container}>
        <Margin marginBottom={52}>
          <Text>Add an emergency contact</Text>
        </Margin>
        <View style={styles.form}>
          <Formik
            initialValues={{number: '', name: ''}}
            onSubmit={() => null}
            validationSchema={loginValidationSchema}>
            {({handleChange, setFieldTouched, touched, errors, values}) => (
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
                    updateDetails(
                      [...contacts, {name: values.name, number: values.number}],
                      {name: values.name,number:values.number},
                    );
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
