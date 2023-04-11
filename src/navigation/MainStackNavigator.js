import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../components/Login/LoginScreen";
import MyTabs from "./MainTabNavigator";
import FirstScreen from "../components/Register/FirstScreen";
import RegisterScreen from "../components/Register/RegisterScreen1";
import RegisterScreen2 from "../components/Register/RegisterScreen2";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FirstScreen"
        component={FirstScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen2"
        component={RegisterScreen2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={MyTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
