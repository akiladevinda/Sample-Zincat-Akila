/**
 * Author : Akila Devinda Rathnayaka
 * Copyrights:
 * Version:
 * Description: Check the Network Connection of the Application
 * Date: 21-07-2020
 */

import NetInfo from '@react-native-community/netinfo';
import {Alert} from 'react-native';

export default class NetworkConnectivity {
  async checkNetworkConnectivity() {
    return await NetInfo.fetch()
      .then((state) => {
        return state.isConnected;
      })
      .catch((error) => {
        return error;
      });
  }
  networkconnctivityError = () => {
    return Alert.alert(
      'Connection Error',
      'Please Check Your Internet Connection',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };
}
