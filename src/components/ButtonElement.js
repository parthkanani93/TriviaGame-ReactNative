import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import TextElement from './TextElement';

const ButtonElement = props => {
  const {customButtonStyle, customTextStyle, buttonName, ...rest} = props;
  return (
    <>
      <TouchableOpacity
        style={[styles.buttonStyle, customButtonStyle]}
        {...rest}>
        <TextElement customStyle={customTextStyle}>{buttonName}</TextElement>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'red',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: 90,
    alignSelf: 'center',
    borderRadius: 5,
  },
});

export default ButtonElement;
