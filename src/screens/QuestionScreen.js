import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, SafeAreaView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputElement from '../components/InputElement';
import TextElement from '../components/TextElement';
import ButtonElement from '../components/ButtonElement';
import LoadingIndicator from '../components/LoadingIndicator';
import {Api} from '../utils/Api';
import {random} from '../utils/config';
import {colors} from '../theme/ColorPalette';
import {clearStorage, storeAnswer} from '../utils/AsyncStorage';

const QuestionScreen = () => {
  const [loading, setLoading] = useState(false);
  const [triviaData, setTriviaData] = useState({});
  const [inputAnswer, setInputAnswer] = useState('');
  const [answerError, setAnswerError] = useState('');

  useEffect(() => {
    getTriviaQuestion();
  }, []);

  const alert = message => {
    Alert.alert('Result', message, [
      {
        text: 'OK',
        onPress: () => {
          getTriviaQuestion();
          setInputAnswer('');
          setAnswerError('');
        },
      },
    ]);
  };

  const getTriviaQuestion = async () => {
    setLoading(true);
    try {
      const {data, statusCode} = await Api.getRequest(random.randomQuestion);
      if (data && statusCode === 200) {
        setTriviaData(data[0]);
        await storeAnswer('answer', data[0]?.answer);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      return;
    }
  };

  const onSubmitPress = useCallback(async () => {
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
    await clearStorage();
  }, [inputAnswer]);

  const validateAnswerInput = useCallback(() => {
    if (inputAnswer !== '') {
      setAnswerError('');
      return;
    }
    setAnswerError('Please Enter Answer');
  }, [inputAnswer]);

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
          placeholderTextColor={colors.placeholder}
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
    backgroundColor: colors.primary,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.white,
    marginHorizontal: '10%',
    minHeight: '20%',
    borderRadius: 30,
    padding: '10%',
  },
});

export default QuestionScreen;
