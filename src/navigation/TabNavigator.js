import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import EventsScreen from "../screens/EventsScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { colors } from "../theme";
import CustomHeader from "../components/CustomHeader";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";


import MyEventsScreen from "../screens/MyEventsScreen";
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
// import HomeNavigator from "./HomeNavigator";
// import EventsNavigator from "./EventsNavigator";
// import ProfileNavigator from "./ProfileNavigator";
import { useAuth } from "../store/context/authContext";
import InfluencerTabNavigator from "./InfluencerTabNavigator";
import VenueTabNavigator from "./VenueTabNavigator";


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const user=useAuth().user
    return (
        user.role==="influencer" ? <InfluencerTabNavigator />:<VenueTabNavigator />
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

export default TabNavigator;
