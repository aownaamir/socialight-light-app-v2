import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomHeader from "../components/CustomHeader";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

import HomeInfluencerNavigator from "./HomeInfluencerNavigator";
import EventsInfluencerNavigator from "./EventsInfluencerNavigator";
import ProfileInfluencerNavigator from "./ProfileInfluencerNavigator";
import { colors } from "../theme";


const Tab = createBottomTabNavigator();

const InfluencerTabNavigator = () => {
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
      <Tab.Screen name="HomeTab" component={HomeInfluencerNavigator} />
      <Tab.Screen name="EventsTab" component={EventsInfluencerNavigator} />
      <Tab.Screen name="ProfileTab" component={ProfileInfluencerNavigator} />
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

export default InfluencerTabNavigator;
