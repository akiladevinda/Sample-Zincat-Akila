/**
 * Author : Akila Devinda Rathnayaka
 * Copyrights:
 * Version:
 * Description: Local Storage Class Component -> Async Storage RN
 * Date: 21-07-2020
 */

import AsyncStorage from '@react-native-community/async-storage';

class LocalStorage {
  //Store Data in Local Storage
  storeData = (key, value) => {
    console.log('SAVE TO LOCAL STORAGE ----> START');
    AsyncStorage.setItem(key, JSON.stringify(value));
    console.log('SAVE TO LOCAL STORAGE ----> FINISH');
  };

  //Get Data from Local Storage
  getData = async (key) => {
    console.log('GET FROM LOCAL STORAGE ----> START');
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      console.log('GET FROM LOCAL STORAGE ----> FINISH');
      return item;
    } catch (error) {}
    return;
  };

  //Clear All Local Storage Data -> REMOVE ALL STORAGE CANNOT GETBACK
  clearData = () => {
    AsyncStorage.clear();
  };
}
export default LocalStorage;
