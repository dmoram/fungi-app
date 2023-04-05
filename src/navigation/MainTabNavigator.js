import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../components/Feed/FeedScreen';
import ProfileScreen from '../components/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs;