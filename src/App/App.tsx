import React from 'react';
import {React$Node} from '../TypesAndInterfaces/AppTypes';
import QuestionScreen from './screens/QuestionScreen';

const App: () => React$Node = () => {
  return (
    <>
      <QuestionScreen />
    </>
  );
};

export default App;
