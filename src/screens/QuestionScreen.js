import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { alert } from '../utils/helper';

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
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="yellow" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.card}>
        <Text style={styles.question}>Question :- </Text>
        <Text style={styles.question}>{`${triviaData?.question} ?`}</Text>
        <TextInput
          value={inputAnswer}
          placeholder="Enter Your Answer"
          placeholderTextColor="white"
          style={styles.inputContainer}
          onChangeText={setInputAnswer}
          onEndEditing={validateAnswerInput}
        />
        <Text>{answerError}</Text>
        <TouchableOpacity style={styles.submitButton} onPress={onSubmitPress}>
          <Text>Submit</Text>
        </TouchableOpacity>
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
  question: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 15,
  },
  submitButton: {
    backgroundColor: 'red',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 90,
    alignSelf: 'center',
    borderRadius: 5,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
});

export default QuestionScreen;
