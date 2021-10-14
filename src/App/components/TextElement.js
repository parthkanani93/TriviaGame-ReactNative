import React from 'react';
import {Text, StyleSheet} from 'react-native';

const TextElement = props => {
  const {children, customStyle, ...rest} = props;
  return (
    <Text style={[styles.textStyle, customStyle]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    marginVertical: 10,
  },
});

export default React.memo(TextElement);
