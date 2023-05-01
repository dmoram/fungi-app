import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedScreen from "../screens/FeedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HumanFungiScreen from "../screens/HumanFungiScreen";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

function ScreenOptions(title, label, icon) {
  return {
    headerShown: true,
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#370837'},
    headerTitle: title,
    tabBarLabel: label,
    headerTitleAlign: 'center',
    tabBarIcon: ({ focused }) => (
      <View>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 34,
            height: 34,
            tintColor: focused ? "#FFD300" : "#9A9A9A",
          }}
        />
      </View>
    ),
  };
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#370837",
          height: 70,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { color: "white", fontSize: 13 },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={ScreenOptions("Micelio", "Micelio", require("../assets/forum.png"))}
      />
      <Tab.Screen
        name="Fungi"
        component={HumanFungiScreen}
        options={ScreenOptions("Humano-Hongo", "Humano-Hongo", require("../assets/hongo_icon.png"))}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={ScreenOptions("Perfil", "Perfil", require("../assets/profile_icon.png"))}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: "#F9F9F8",
  },
});
