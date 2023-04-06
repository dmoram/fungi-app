import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../components/Feed/FeedScreen';
import ProfileScreen from '../components/Profile/ProfileScreen';
import FungiSensorScreen from '../components/FungiSensor/FungiSensorScreen';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator 
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: 'green' }}
    >
      <Tab.Screen 
        name="Feed" 
        component={FeedScreen}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={34} />
          ),
        }}   
        
      />
      <Tab.Screen 
        name="Fungi" 
        component={FungiSensorScreen}
        options={{
          tabBarLabel: 'Fungi',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="mushroom" color={color} size={34} />
          ),
        }}   
        
      />

      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={34} />
          ),
        }}  
      />
    </Tab.Navigator>
  );
}

export default MyTabs;

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: 'green'
  }
});

