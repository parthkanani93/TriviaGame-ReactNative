import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAnswer = (key: string, data: string) => {
  AsyncStorage.setItem(key, data);
};
export const clearStorage = () => {
  AsyncStorage.clear();
};
