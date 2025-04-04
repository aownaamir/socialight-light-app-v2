import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import UserProfileScreen from "../screens/ProfileUserScreen";
import MyEventsScreen from "../screens/MyEventsScreen";
import EventsScreen from "../screens/EventsScreen";
import VenueProfileScreen from "../screens/VenueProfileScreen";

const Stack = createNativeStackNavigator();

const ProfileVenueNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={VenueProfileScreen}  />
            <Stack.Screen name="EventsScreen" component={EventsScreen}  />
        </Stack.Navigator>
);
}

export default ProfileVenueNavigator;