import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import MyTabs from "./MainTabNavigator";
import FirstScreen from "../screens/FirstScreen";
import RegisterScreen from "../screens/RegisterScreen1";
import RegisterScreen2 from "../screens/RegisterScreen2";
import NewPostScreen from "../screens/NewPostScreen";
import CommentScreen from "../screens/CommentScreen";
import NewFungiRecordScreen1 from "../screens/NewFungiRecordScreen1";
import NewFungiRecordScreen2 from "../screens/NewFungiRecordScreen2";
import NewFungiRecordScreen3 from "../screens/NewFungiRecordScreen3";
import FungiRecordsScreen from "../screens/FungiRecordsScreen";
import AccountScreen from "../screens/AccountScreen";
import SeeProfileScreen from "../screens/SeeProfileScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import MapScreen from "../screens/MapScreen";

function ScreenOptions(title) {
  return {
    headerShown: true,
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#370837" },
    headerTitle: title,
    headerTitleAlign: "center",
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
        options={ScreenOptions("Registro: Paso 1")}
      />
      <Stack.Screen
        name="RegisterScreen2"
        component={RegisterScreen2}
        options={ScreenOptions("Registro: Paso 2")}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={ScreenOptions("Inicio de sesión")}
      />
      <Stack.Screen
        name="Tabs"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewPostScreen"
        component={NewPostScreen}
        options={ScreenOptions("Nueva publicación")}
      />
      <Stack.Screen
        name="CommentScreen"
        component={CommentScreen}
        options={ScreenOptions("Comentarios")}
      />
      <Stack.Screen
        name="FungiRecordsScreen"
        component={FungiRecordsScreen}
        options={ScreenOptions("Registros Fungi")}
      />
      <Stack.Screen
        name="NewFungiRecordScreen1"
        component={NewFungiRecordScreen1}
        options={ScreenOptions("Nuevo registro Fungi")}
      />
      <Stack.Screen
        name="NewFungiRecordScreen2"
        component={NewFungiRecordScreen2}
        options={ScreenOptions("Nuevo registro Fungi")}
      />
      <Stack.Screen
        name="NewFungiRecordScreen3"
        component={NewFungiRecordScreen3}
        options={ScreenOptions("Nuevo registro Fungi")}
      />
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={ScreenOptions("Ajustes de cuenta")}
      />
      <Stack.Screen
        name="SeeProfileScreen"
        component={SeeProfileScreen}
        options={ScreenOptions("Vista de perfil")}
      />
      <Stack.Screen
        name="AnalyticsScreen"
        component={AnalyticsScreen}
        options={ScreenOptions("Analítica")}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={ScreenOptions("Mapa")}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
