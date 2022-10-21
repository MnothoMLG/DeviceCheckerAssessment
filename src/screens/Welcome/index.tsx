import React from 'react';
import {View} from 'react-native';
import Input from '../../components/Input';
import {Formik} from 'formik';
import {Margin} from '../../components/layout/layout';
import HeaderWrapper from '../../components/layout/back-screen';
import {globalValidationScheme} from '../../utils/Validation';
import {useDispatch} from 'react-redux';
import {loginRequest} from '../../store/auth/actions';
import {AppButton, Text} from '../../components';
import strings from '../../constants/strings';
import styles from './styles';

const Welcome: React.FC = () => {
  const dispatch = useDispatch();

  const login = (name: string) => {
    dispatch(loginRequest({name}));
  };
  return (
    <HeaderWrapper
      useKeyboardScrollView
      hideback
      onBackPress={() => {}}
      title={'Welcome'}>
      <View style={styles.container}>
        <Margin mb={52}>
          <Text>{strings.prompt}</Text>
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
            }) => {
              return (
                <>
                  <Input
                    autoCapitalize="none"
                    style={styles.input}
                    placeholder={strings.name}
                    label={strings.name}
                    required
                    maxLength={12}
                    onChangeText={handleChange('name')}
                    onBlur={() => setFieldTouched('name')}
                    value={values.name}
                    error={errors.name}
                    testID="name-input"
                    touched={touched.name}
                  />
                  <Margin mt={36} />
                  <AppButton
                    fullWidth
                    rounded
                    testID="continue-button"
                    disabled={!isValid || !values.name}
                    onPress={() => {
                      login(values.name);
                    }}>
                    <Text style={[styles.text, styles.textBold]}>
                      {strings.continue}
                    </Text>
                  </AppButton>
                </>
              );
            }}
          </Formik>
        </View>
      </View>
    </HeaderWrapper>
  );
};

export default Welcome;
