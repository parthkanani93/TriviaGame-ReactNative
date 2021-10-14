export const alert = (message, triviaQuestion, setInputAnswer) => {
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
