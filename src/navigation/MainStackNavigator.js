import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import MyTabs from "./MainTabNavigator";
import FirstScreen from "../screens/FirstScreen";
import RegisterScreen from "../screens/RegisterScreen1";
import RegisterScreen2 from "../screens/RegisterScreen2";
import NewPostScreen from "../screens/NewPostScreen";

function ScreenOptions(title) {
  return {
    headerShown: true,
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#370837' },
    headerTitle: title,
    headerTitleAlign: 'center'
  };
}

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
        options={ScreenOptions('Registro: Paso 1')}
      />
      <Stack.Screen
        name="RegisterScreen2"
        component={RegisterScreen2}
        options={ScreenOptions('Registro: Paso 2')}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={ScreenOptions('Inicio de sesión')}
      />
      <Stack.Screen
        name="Tabs"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewPostScreen"
        component={NewPostScreen}
        options={ScreenOptions('Nueva publicación')}
        
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
