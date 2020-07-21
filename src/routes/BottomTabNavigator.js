/**
 * Author : Akila Devinda Rathnayaka
 * Copyrights:
 * Version:
 * Description: Material Bottom Navigation Component
 * Date: 21-07-2020
 */

import * as React from 'react';
import {Image} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Import all the screens of the application
import HomeScreen from '../screens/Home/HomeScreen';

const Tab = createMaterialBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#FA563F"
      inactiveColor="#403F3D"
      barStyle={{backgroundColor: 'white'}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="truck" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Location"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="navigation" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Books"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="book-variant"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="hammer-screwdriver"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
