/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, Text, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import InputElement from './src/components/InputElement';
import QuestionScreen from './src/screens/QuestionScreen';

const App: () => Node = () => {
  return (
    <>
      <QuestionScreen />
    </>
  );
};

export default App;
