import React, {useState} from 'react';
import {
  View,
  Text as RnText,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import Input from '../../components/Input';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {Margin, Row} from '../../components/layout/layout';
import {Text} from '../../components/';
import {Fonts} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {globalValidationScheme} from '../../utils/Validation';
import {endLoading, startLoading} from '../../redux/modules/loading/actions';
import styles from './styles';
import {updateProfile} from '../../redux/modules/auth/actions';
import flashMessage from '../../utils/showFlashMessage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const usersCollection = firestore().collection('users');

export default function AlertSettings(): JSX.Element {
  const navigation = useNavigation();
  const profile = useSelector(state => state.authReducer.profile);
  const {number, message} = profile;
  const dispatch = useDispatch();
  const updateMessage = (message: string) => {
    dispatch(startLoading());
    usersCollection
      .doc(number)
      .update({message})
      .then(() => {
        navigation.goBack();
        dispatch(updateProfile({...profile, message}));
        flashMessage('success', 'Profile updated');
      })
      .catch(() => {
        flashMessage('danger', 'An error occured');
      })
      .finally(() => setTimeout(() => dispatch(endLoading()), 2000));
  };
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps={"handled"}
      enableResetScrollToCoords={false}
      extraHeight={Platform.OS === 'ios' ? -64 : undefined}
      testID={'scrollview'}
      contentContainerStyle={styles.container}>
      <SwitchSetting
        description="Send an Email to your mail list and your organisation on help request"
        setting="Email"
      />
      <View style={styles.form}>
        <Formik
          initialValues={{msg: message}}
          onSubmit={() => null}
          validationSchema={globalValidationScheme}>
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
                onPress={() => updateMessage(values.msg)}
                style={styles.continue}>
                <RnText style={[styles.text, styles.textBold]}>
                  Save Changes
                </RnText>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
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
    <View style={styles.settingWrapper}>
      <Text font={Fonts.headingBold}>{setting}</Text>
      <Text mb={1} font={Fonts.body}>
        {description}
      </Text>
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
