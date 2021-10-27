import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Input from '../../components/Input';
import {Formik} from 'formik';
import {Margin} from '../../components/layout/layout';
import HeaderWrapper from '../../components/layout/back-screen';
import {useSelector} from 'react-redux';
import {globalValidationScheme} from '../../utils/Validation';
import {Contact} from '../../redux/modules/contacts/types';

export default function AddContact(props: {
  closeModal: any;
  contact: Contact;
  editing?: boolean;
}): JSX.Element {
  const {closeModal, contact, updateContacts, editing} = props;
  const {contacts} = useSelector(state => ({
    contacts: state.contactsReducer.contacts,
  }));

  return (
    <HeaderWrapper
      onBackPress={() => closeModal && closeModal()}
      title={editing ? 'Edit Contact' : 'New Contact'}>
      <View style={styles.container}>
        <Margin marginBottom={52}>
          <Text>{editing ? 'Edit Contact' : 'Add an emergency contact'}</Text>
        </Margin>
        <View style={styles.form}>
          <Formik
            initialValues={{
              number: editing ? contact.number : '',
              name: editing ? contact.name : '',
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
                  // disabled={!isValid}
                  onPress={() => {
                    if (editing) {
                      const index = contacts.findIndex(
                        (c: Contact) => c.name === contact.name,
                      );
                      if (index > 0) {
                        const newList = [...contacts];
                        newList[index] = {
                          name: values.name,
                          number: values.number,
                        };
                        updateContacts(newList);
                      }
                    } else {
                      const newContact = {
                        name: values.name,
                        number: values.number,
                      };

                      updateContacts(
                        [...contacts, newContact],
                        newContact,
                        true,
                      );
                    }
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
