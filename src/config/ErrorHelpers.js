/**
 * Author : Akila Devinda Rathnayaka
 * Copyrights:
 * Version:
 * Description: Error Helper Class For Global Errors
 * Date: 21-07-2020
 */
import {Alert} from 'react-native';

export default class ErrorHelpers {
  globalError = () => {
    return Alert.alert(
      'Try Again !',
      'Something went wrong.. Please try again',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };

  networkconnctivityError = () => {
    return Alert.alert(
      'Connection Error',
      'Please Check Your Internet Connection',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };

  formValidationError = () => {
    return Alert.alert(
      'Error',
      'Please Fill All The Details',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };
}
