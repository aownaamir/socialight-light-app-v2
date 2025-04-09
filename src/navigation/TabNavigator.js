import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
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
