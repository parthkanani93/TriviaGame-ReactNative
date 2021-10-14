import React, {FunctionComponent} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {colors} from '../theme/ColorPalette';
import TextElement from './TextElement';

interface ButtonElementProps extends TouchableOpacityProps {
  customButtonStyle?: ViewStyle;
  customTextStyle?: TextStyle;
  buttonName?: String;
}

const ButtonElement: FunctionComponent<ButtonElementProps> = props => {
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
    backgroundColor: colors.red,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: 90,
    alignSelf: 'center',
    borderRadius: 5,
  },
});

export default React.memo(ButtonElement);
