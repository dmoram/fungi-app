import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../components/Feed/FeedScreen';
import ProfileScreen from '../components/Profile/ProfileScreen';
import FungiSensorScreen from '../components/FungiSensor/FungiSensorScreen';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Feed'
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      screenOptions={{
        tabBarStyle: {backgroundColor:'#D4B16A', height:70, paddingBottom:8},
      }}
      
    >
      <Tab.Screen 
        name="Feed" 
        component={FeedScreen}
        options={{
          tabBarLabel: 'Feed',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require('../assets/forum.png')}
                resizeMode='contain'
                style={{
                  width: 35,
                  height: 35,
                  tintColor: focused ? 'black' : '#748c94'
                }}

              />
            </View>  
          ),
        }}   
        
      />
      <Tab.Screen 
        name="Fungi" 
        component={FungiSensorScreen}
        options={{
          tabBarLabel: 'Fungi',
          headerShown: false,
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
          headerShown: false,
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
    backgroundColor: '#CBB26A'
  },
});

