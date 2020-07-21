/**
 * Author : Akila Devinda Rathnayaka
 * Copyrights:
 * Version:
 * Description: Home Screen Component of the Application
 * Date: 21-07-2020
 */

/* 
 NOTE
 We can create this confirm function using 3 different ways
 1 - Using local state to save user entered value ( Currently in this demo) -> 
 If the app close and reopen state will gone because not saved in cache
 2 - Using Asyncstorage to save user enter value and get ( Check my Localstorage File)
 3 - Using redux and using REST API's
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Images from '../../config/Images';
import Metrics from '../../config/Metrics';
import AppStyles from '../../config/AppStyles';
import {Picker} from '@react-native-community/picker';
import {Rating} from 'react-native-ratings';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {Button} from 'react-native-elements';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerData: 'Vehicle',
      alertPopup: false,
      isDrivingStart: false,
      dateTime: '',
      location: '',
      huboReading: '',
      enteredDateTime: '',
    };
  }

  /* 
  Confirm and Log Click Listner
  */
  onConfirmandLogClickListner = () => {
    let {dateTime, location, huboReading} = this.state;
    //Check user entered values are null or not - Basic Validation
    if (!dateTime || !location || !huboReading) {
      Alert.alert(
        'Check Again',
        'Please Fill All Details',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      //Save user entered date and time
      this.setState({enteredDateTime: dateTime});
      //Show the driving in progressview
      this.setState({isDrivingStart: true, alertPopup: false});
      Alert.alert(
        'Success',
        'Details Saved Successfully',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };
  /* 
  Render Modal View
  */
  renderModalPopupView = () => {
    return (
      <View>
        <Modal
          isVisible={this.state.alertPopup}
          onBackdropPress={() => this.setState({alertPopup: false})}>
          <View style={styles.dialogStyle}>
            <View
              style={{
                width: Metrics.DEVICE_WIDTH / 1.4,
                marginTop: 20,
              }}>
              <Text style={styles.modalHeaderText}>Start Driving</Text>
              <View style={{marginTop: 30}}>
                <Text style={styles.inputHeaderText}>Time and Date</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={this.state.dateTime}
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    onChangeText={(dateTime) => this.setState({dateTime})}
                    onSubmitEditing={() => {
                      this.location.focus();
                    }}
                    returnKeyType={'next'}
                  />
                </View>
              </View>
              <View style={{marginTop: 10}}>
                <Text style={styles.inputHeaderText}>Location</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    ref={(input) => {
                      this.location = input;
                    }}
                    style={styles.input}
                    value={this.state.location}
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    onChangeText={(location) => this.setState({location})}
                    onSubmitEditing={() => {
                      this.huboReading.focus();
                    }}
                    returnKeyType={'next'}
                  />
                </View>
              </View>
              <View style={{marginTop: 10}}>
                <Text style={styles.inputHeaderText}>Current Hubo Reading</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    ref={(input) => {
                      this.huboReading = input;
                    }}
                    style={styles.input}
                    value={this.state.huboReading}
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    onChangeText={(huboReading) => this.setState({huboReading})}
                  />
                </View>
              </View>
              <Button
                title="CONFIRM AND LOG"
                onPress={() => this.onConfirmandLogClickListner()}
                buttonStyle={{
                  height: 60,
                  borderRadius: 30,
                  marginTop: 40,
                  backgroundColor: '#F75029',
                }}
                style={styles.confirmButtonContainer}
              />

              <Text
                style={styles.cancelText}
                onPress={() => this.setState({alertPopup: false})}>
                CANCEL
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  /* 
  Render Information Header View
  */
  renderInformationHeaderView = () => {
    return (
      <View style={styles.infoheaderContainer}>
        <View>
          <Picker
            selectedValue={this.state.pickerData}
            style={styles.pickerStyle}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({language: itemValue})
            }>
            <Picker.Item label="Select" value="null" />
            <Picker.Item label="Car" value="cr" />
          </Picker>
          <Text style={styles.distanceText}>114,000 KM</Text>
          <Text style={styles.distanceInfoText}>Hubometer</Text>
        </View>
        <View style={styles.separatorLine} />
        <View style={{marginLeft: 10, marginTop: 10}}>
          <Text style={styles.idleText}>Idle</Text>
          <Text style={styles.currentStatus}>Current Status</Text>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={20}
            onFinishRating={this.ratingCompleted}
          />
        </View>
        <View style={styles.separatorLinesub} />
        <View style={{marginLeft: 5, marginTop: 20}}>
          <Text style={styles.hourText}>3h</Text>
          <Text style={styles.hourTextSub}>Next Break due</Text>
        </View>
      </View>
    );
  };

  /* 
  Render Menu Base View
  */
  renderMenuBaseView = () => {
    return (
      <View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          {this.state.isDrivingStart == true ? (
            <TouchableOpacity style={styles.buttonContainerLarge}>
              <Image source={Images.HOME_PROGRESS} style={styles.buttonImage} />
              <Text style={styles.buttonTextLarge}>DRIVING IN PROGRESS</Text>
              <Text style={styles.buttonTextLargeInfo}>
                Date Time : {this.state.dateTime}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.buttonContainerLarge}
              onPress={() => this.setState({alertPopup: true})}>
              <Image
                source={Images.HOME_START_DRIVING}
                style={styles.buttonImage}
              />
              <Text style={styles.buttonTextLarge}>START DRIVING</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity style={styles.buttonContainerSmall}>
            <Image source={Images.HOME_OTHER_WORK} style={styles.buttonImage} />
            <Text style={styles.buttonTextSmall}>START OTHER WORK</Text>
          </TouchableOpacity>
          <View style={{width: 20}}></View>
          <TouchableOpacity style={styles.buttonContainerSmall}>
            <Image source={Images.HOME_START_REST} style={styles.buttonImage} />
            <Text style={styles.buttonTextSmall}>START TEST</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity style={styles.buttonContainerLarge}>
            <Image source={Images.HOME_END_DAY} style={styles.buttonImage} />
            <Text style={styles.buttonTextLarge}>END OF THE DAY</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: Metrics.DEVICE_WIDTH / 12, marginTop: 20}}>
          <Text
            style={{
              color: AppStyles.colorBlack,
            }}>
            Drivers Last Remarks
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: AppStyles.colorBlack,
            }}>
            Get access code is 343434. ask for Mike
          </Text>
        </View>
        <View style={{height: 20}}></View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <ImageBackground
            source={Images.HOME_HEADER}
            style={styles.headerImage}>
            <View style={styles.headerView}>
              <Image
                source={Images.HOME_HEADER_LOGO}
                style={styles.headerDecImage}
              />
              <Text style={styles.headerTitle}>DriveTime</Text>
            </View>
          </ImageBackground>
          {this.renderInformationHeaderView()}
          {this.renderMenuBaseView()}
          {this.renderModalPopupView()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: Metrics.DEVICE_WIDTH,
    height: Metrics.DEVICE_HEIGHT / 5,
    resizeMode: 'contain',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Metrics.DEVICE_HEIGHT / 20,
  },
  headerDecImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 25,
    marginLeft: 10,
    fontWeight: 'bold',
    color: AppStyles.colorWhite,
    textAlign: 'center',
  },
  /* 
  Information Header View
  */
  infoheaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  pickerStyle: {
    height: 50,
    width: Metrics.DEVICE_WIDTH / 3,
  },
  distanceText: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 'bold',
    color: AppStyles.colorBlack,
  },
  distanceInfoText: {
    fontSize: 14,
    marginLeft: 10,
    color: AppStyles.colorBlack,
  },
  separatorLine: {
    backgroundColor: '#C4C4C4',
    width: 1,
    height: 100,
  },
  separatorLinesub: {
    backgroundColor: '#C4C4C4',
    width: 1,
    height: 100,
    marginLeft: 20,
  },
  idleText: {
    fontSize: 25,
    marginLeft: 10,
    fontWeight: 'bold',
    color: AppStyles.colorBlack,
    textAlign: 'center',
  },
  currentStatus: {
    fontSize: 14,
    marginLeft: 10,
    color: AppStyles.colorBlack,
  },
  hourText: {
    fontSize: 25,
    marginLeft: 10,
    fontWeight: 'bold',
    color: AppStyles.colorBlack,
    textAlign: 'center',
  },
  hourTextSub: {
    fontSize: 14,
    marginLeft: 10,
    color: AppStyles.colorBlack,
  },
  /* 
  Menu Base View
  */
  buttonContainerLarge: {
    width: Metrics.DEVICE_WIDTH / 1.2,
    height: 120,
    backgroundColor: '#D9FEE1',
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonImage: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  buttonTextLarge: {
    fontSize: 20,
    fontWeight: 'bold',
    color: AppStyles.colorBlack,
    textAlign: 'center',
  },
  buttonTextLargeInfo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: AppStyles.colorBlack,
    textAlign: 'center',
  },
  buttonContainerSmall: {
    width: Metrics.DEVICE_WIDTH / 2.5,
    height: 120,
    backgroundColor: '#FDF2BA',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonTextSmall: {
    fontSize: 14,
    color: AppStyles.colorBlack,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  /* 
  Alert Dialog 
  */
  dialogStyle: {
    backgroundColor: AppStyles.colorWhite,
    borderRadius: 20,
    width: Metrics.DEVICE_WIDTH / 1.2,
    height: Metrics.DEVICE_HEIGHT / 1.6,
    alignItems: 'center',
    marginLeft: 10,
  },
  dialogContentStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
    margin: 0,
    padding: 0,
  },
  titleStyle: {
    fontSize: 30,
    color: AppStyles.colorBlack,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bodyText: {
    fontFamily: AppStyles.primaryFont,
    fontSize: 18,
    color: AppStyles.colorWhite,
  },
  inputHeaderText: {
    fontSize: 15,
    color: '#999999',
  },
  inputContainer: {
    borderBottomColor: '#F75029',
    backgroundColor: AppStyles.colorWhite,
    borderRadius: 5,
    borderBottomWidth: 1,
    width: Metrics.DEVICE_WIDTH / 1.4,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    marginLeft: 5,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    fontSize: 15,
  },
  confirmButtonContainer: {
    width: Metrics.DEVICE_WIDTH / 1.5,
    height: 80,
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 30,
  },
  modalHeaderText: {
    fontSize: 30,
    color: AppStyles.colorBlack,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelText: {
    fontSize: 20,
    marginTop: 20,
    color: '#F75029',
    textAlign: 'center',
  },
});
