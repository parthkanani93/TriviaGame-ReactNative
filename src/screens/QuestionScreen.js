import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputElement from '../components/InputElement';
import TextElement from '../components/TextElement';
import ButtonElement from '../components/ButtonElement';
import LoadingIndicator from '../components/LoadingIndicator';

const QuestionScreen = () => {
  const [loading, setLoading] = useState(false);
  const [triviaData, setTriviaData] = useState({});
  const [inputAnswer, setInputAnswer] = useState('');
  const [answerError, setAnswerError] = useState('');

  useEffect(() => {
    triviaQuestion();
  }, []);

  const alert = message => {
    Alert.alert('Result', message, [
      {
        text: 'OK',
        onPress: () => {
          triviaQuestion();
          setInputAnswer('');
          setAnswerError('');
        },
      },
    ]);
  };

  const triviaQuestion = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://jservice.io/api/random`);
      const jsonData = await response.json();
      setTriviaData(jsonData[0]);
      await AsyncStorage.setItem('answer', jsonData[0]?.answer);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      return;
    }
  };

  const onSubmitPress = async () => {
    if (inputAnswer === '') {
      setAnswerError('Please Enter Answer');
      return;
    }
    const answer = await AsyncStorage.getItem('answer');
    if (answer.toLowerCase() === inputAnswer.toLowerCase()) {
      alert('Your Answer Is correct');
    } else {
      alert('Your Answer Is Wrong');
    }
    await AsyncStorage.clear();
  };

  const validateAnswerInput = () => {
    if (inputAnswer !== '') {
      setAnswerError('');
      return;
    }
    setAnswerError('Please Enter Answer');
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.card}>
        <TextElement>{'Question :- '}</TextElement>
        <TextElement>{`${triviaData?.question} ?`}</TextElement>
        <InputElement
          value={inputAnswer}
          placeholder={'Enter Your Answer Here'}
          placeholderTextColor={'white'}
          onChangeText={setInputAnswer}
          onEndEditing={validateAnswerInput}
          error
          errorText={answerError}
        />
        <ButtonElement buttonName={'Submit'} onPress={onSubmitPress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: '10%',
    minHeight: '20%',
    borderRadius: 30,
    padding: '10%',
  },
});

export default QuestionScreen;
