import React, {ReactNode, FunctionComponent} from 'react';
import {Text, StyleSheet, TextProps, TextStyle} from 'react-native';

interface TextElementProps extends TextProps {
  customStyle?: TextStyle;
  children?: ReactNode;
}

const TextElement: FunctionComponent<TextElementProps> = props => {
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
