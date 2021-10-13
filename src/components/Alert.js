import React from 'react';
import {View, Text} from 'react-native';

const Alert = message => {
  Alert.alert('Result', {message}, [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
};

export default Alert;
