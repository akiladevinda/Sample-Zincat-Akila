/**
 * Author : Akila Devinda Rathnayaka
 * Copyrights:
 * Version:
 * Description: Screen Deminensions Globally
 * Date: 21-07-2020
 */
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export default {
  DEVICE_HEIGHT: height,
  DEVICE_WIDTH: width,
};
