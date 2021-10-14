import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {colors} from '../theme/ColorPalette';

const LoadingIndicator = () => {
  return (
    <View style={styles.activityIndicator}>
      <ActivityIndicator size="large" color={colors.yellow} />
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
});

export default LoadingIndicator;
