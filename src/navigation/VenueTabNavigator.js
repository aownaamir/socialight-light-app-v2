import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import EventsScreen from "../screens/EventsScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { colors } from "../theme";
import CustomHeader from "../components/CustomHeader";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import MyEventsScreen from "../screens/MyEventsInfluencerScreen";
import EventAnalyticsScreen from "../screens/EventAnalyticsScreen";
import OTPScreen from "../screens/OTPScreen";
import RejectedScreen from "../screens/RejectedScreen";
import WaitlistScreen from "../screens/WaitlistScreen";
import ProfileScreen2 from "../screens/ProfileScreen2";
import ProfileUserScreen from "../screens/ProfileUserScreen";
import VenueProfileScreen from "../screens/VenueProfileScreen";
import CreateEventsScreen from "../screens/CreateEventsScreen";
import VenueRequestScreen from "../screens/VenueRequestScreen";
import LoadingScreen from "../screens/LoadingScreen";
import TiltedCarousel from "../chat/TiltedCarousel";
import Carousel2 from "../chat/Carousel2";
import StylishCarousel from "../chat/StylishCarousel";
// import HomeVenueNavigator from "./HomeVenueNavigator";
import EventsVenueNavigator from "./EventsVenueNavigator";
import HomeVenueNavigator from "./HomeVenueNavigator";
import ProfileVenueNavigator from "./ProfileVenueNavigator";


const Tab = createBottomTabNavigator();

const VenueTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'EventsTab') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // Create a fixed height container with centered icon and dot
          return (
            <View style={styles.tabIconContainer}>
              <View style={styles.iconWrapper}>
                <Ionicons name={iconName} size={20} color={focused ? '#4BE0C2' : colors.textSecondary} />
              </View>
              <View style={[styles.dotWrapper, { opacity: focused ? 1 : 0 }]}>
                <View style={styles.activeDot} />
              </View>
            </View>
          );
        },
        tabBarActiveTintColor: '#4BE0C2',
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          height: 60,
          paddingVertical: 10,
          elevation: 0,
          shadowOpacity: 0,
        },
        header: (props) => <CustomHeader {...props} />,
      })}
      initialRouteName="HomeTab"
    >
      {/* <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Profile" component={ProfileUserScreen} /> */}
      <Tab.Screen name="HomeTab" component={HomeVenueNavigator} />
      <Tab.Screen name="EventsTab" component={EventsVenueNavigator} />
      <Tab.Screen name="ProfileTab" component={ProfileVenueNavigator} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    paddingTop: 17,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconWrapper: {
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotWrapper: {
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -13,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4BE0C2',
  }
});

export default VenueTabNavigator;
