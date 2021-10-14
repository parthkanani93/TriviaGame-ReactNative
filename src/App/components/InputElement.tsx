import React, {FunctionComponent} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TextStyle,
} from 'react-native';
import {colors} from '../theme/ColorPalette';

interface InputElementProps extends TextInputProps {
  customStyle?: TextStyle;
  placeholder?: string;
  value?: string;
  error?: boolean;
  errorText?: string;
}

const InputElement: FunctionComponent<InputElementProps> = props => {
  const {value, placeholder, customStyle, error, errorText, ...rest} = props;
  return (
    <>
      <TextInput
        value={value}
        placeholder={placeholder}
        style={[styles.inputContainer, customStyle]}
        {...rest}
      />
      {error && <Text style={styles.errorTextStyle}>{errorText}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colors.lightGrey,
    borderRadius: 10,
    padding: 15,
  },
  errorTextStyle: {
    color: colors.error,
    marginTop: 10,
  },
});

export default React.memo(InputElement);
