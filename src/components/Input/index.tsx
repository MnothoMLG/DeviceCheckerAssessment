/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, {Component, useState} from 'react';
import {TextInput, Text, View, TextInputProps} from 'react-native';
import styles, {InputLabel} from './Styles';
import {FormikErrors, FormikTouched} from 'formik';
import {colors} from '../../theme';

interface IProps extends TextInputProps {
  style: Record<string, unknown> | Record<string, unknown>[];
  value: string;
  error?: FormikErrors<unknown> | string;
  label?: string;
  required?: boolean;
  touched?: FormikTouched<unknown> | boolean;
  secureTextEntry?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (v: string) => void;
}

const Input = ({style = {}, label, required, error, ...props}: IProps) => {
  const textChanged = (text: string): void => {
    props.onChangeText && props.onChangeText(text);
  };
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  return (
    <>
      {label && (
        <InputLabel>
          {label}
          {required && <InputLabel style={{color: 'red'}}>*</InputLabel>}
        </InputLabel>
      )}
      <View style={[styles.container, style, focused && styles.brightBorder]}>
        <TextInput
          {...props}
          placeholderTextColor={colors.background.secondary}
          style={[styles.input]}
          placeholder={props.placeholder || ''}
          value={props.value}
          autoCompleteType={props.autoCompleteType}
          onChangeText={textChanged}
          onFocus={() => {
            setFocused(true);
            setTouched(true);
            props.onFocus && props.onFocus();
          }}
          onBlur={() => {
            setFocused(false);
            props.onBlur && props.onBlur();
          }}
        />
      </View>
      {error && touched && (
        <Text testID={`${label}-validation-error`} style={styles.error}>
          {error}
        </Text>
      )}
    </>
  );
};
export default Input;
