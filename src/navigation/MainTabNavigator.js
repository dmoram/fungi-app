import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
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
        tabBarStyle: {backgroundColor:'#370837', height:70, paddingBottom:8},
        tabBarLabelStyle:{color:'white', fontSize:13}
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
                  tintColor: focused ? '#FFD300':'#9A9A9A',
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
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require('../assets/hongo_icon.png')}
                resizeMode='contain'
                style={{
                  width: 34,
                  height: 34,
                  tintColor: focused ? '#FFD300':'#9A9A9A',
                }}

              />
            </View>  
          ),
        }}   
        
      />

      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Perfil',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require('../assets/profile_icon.png')}
                resizeMode='contain'
                style={{
                  width: 35,
                  height: 35,
                  tintColor: focused ? '#FFD300':'#9A9A9A',
                }}

              />
            </View>  
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

