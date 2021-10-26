import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text as RnText,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Input from '../../components/Input';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {loginValidationSchema} from './Validation';
import {Margin, Row} from '../../components/layout/layout';
import {Text} from '../../components/';
import {Fonts} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
const usersCollection = firestore().collection('users');

export default function AlertSettings(): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profile = useSelector(state => state.authReducer.profile);
  const {number} = profile;

  const updateDetails = (message: string) => {

    usersCollection
    .doc(number)
    .update({message})
    .then(() => {
      //show success flash message
      navigation.goBack();
    });
  }
  return (
    <View style={styles.container}>
      <SwitchSetting
        description="Send an SMS to your contacts on help request"
        setting="SMS"
      />
      <SwitchSetting
        description="Send an Email to your mail list and your organisation on help request"
        setting="Email"
      />
      <View style={styles.form}>
        <Formik
          initialValues={{msg: ''}}
          onSubmit={() => null}
          validationSchema={loginValidationSchema}>
          {({handleChange, setFieldTouched, touched, errors, values}) => (
            <>
              <Input
                autoCapitalize="none"
                style={styles.input}
                placeholder="The message that gets sent to your contacts upon request for help"
                label="Alert Message"
                multiline
                onChangeText={handleChange('msg')}
                onBlur={() => setFieldTouched('msg')}
                value={values.msg}
                error={errors.msg}
                touched={touched.msg}
              />
              <Margin marginTop={52} />
              <TouchableOpacity
                onPress={() => updateDetails(values.msg)}
                style={styles.continue}>
                <RnText style={[styles.text, styles.textBold]}>
                  Save Changes
                </RnText>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

function SwitchSetting({
  setting,
  description,
}: {
  setting: string;
  description: string;
}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View
      style={{
        width: '100%',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#00000010',
      }}>
      <Text font={Fonts.headingBold}>{setting}</Text>
      <Text mb={1} font={Fonts.body}>{description}</Text>
      <Row style={{alignItems: 'center'}} alignHorizontal="space-between">
        <Text font={Fonts.subheadingBold}>{isEnabled ? 'On' : 'Off'}</Text>
        <Switch
          trackColor={{false: '#767577', true: '#FF2D55'}}
          thumbColor={'#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </Row>
    </View>
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
    width: '100%',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 26,
  },
  input: {
    width: '100%',
    padding: 10,
    height: 102,
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
