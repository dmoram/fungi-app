import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/Login/LoginScreen';
import MyTabs from './MainTabNavigator';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Tabs' component={MyTabs}/>
    </Stack.Navigator>
  )
}

export default MainStackNavigator

const styles = StyleSheet.create({})