import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAnswer = (key, data) => {
  AsyncStorage.setItem(key, data);
};
export const clearStorage = () => {
  AsyncStorage.clear();
};
