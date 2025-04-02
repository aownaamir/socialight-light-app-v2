import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MyEventsScreen from "../screens/MyEventsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { colors } from "../theme";
import CustomHeader from "../components/CustomHeader";
import { Ionicons } from "@expo/vector-icons";
import EventsScreen from "../screens/EventsScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import EventAnalyticsScreen from "../screens/EventAnalyticsScreen";
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'Explore') {
        iconName = focused ? 'compass' : 'compass-outline';
      } else if (route.name === 'Notifications') {
        iconName = focused ? 'notifications' : 'notifications-outline';
      } else if (route.name === 'Profile') {
        iconName = focused ? 'person' : 'person-outline';
      } else if (route.name === 'MyEvents') {
        iconName = focused ? 'calendar' : 'calendar-outline';
      }

      // Reduced size from the default (which is likely 24-28)
      return <Ionicons name={iconName} size={20} color={color} />;
    },
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.textSecondary,
    tabBarStyle: {
      backgroundColor: colors.background,
      borderTopWidth: 0, // Remove the top border completely
      height: 60,
      paddingBottom: 10,
      elevation: 0, // Remove shadow on Android
      shadowOpacity: 0, // Remove shadow on iOS
    },
    tabBarLabelStyle: {
      fontSize: 12,
    },
    // Set the header for each screen in the tab navigator
    header: (props) => <CustomHeader {...props} />,
  })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Events" component={EventsScreen} />
    <Tab.Screen name="MyEvents" component={MyEventsScreen} />
    <Tab.Screen name="Details" component={EventDetailsScreen} />
    <Tab.Screen name="Analytics" component={EventAnalyticsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
}

export default TabNavigator;