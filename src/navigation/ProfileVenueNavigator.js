import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import UserProfileScreen from "../screens/ProfileUserScreen";
import MyEventsScreen from "../screens/MyEventsInfluencerScreen";
import EventsScreen from "../screens/EventsScreen";
import VenueProfileScreen from "../screens/VenueProfileScreen";
import MyEventsVenueScreen from "../screens/MyEventsVenueScreen";
import MyVenueEventDetailsScreen from "../screens/MyVenueEventDetailsScreen";
import VenueApplicationsScreen from "../screens/VenueApplicationsScreen";

const Stack = createNativeStackNavigator();

const ProfileVenueNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ProfileMain">
            <Stack.Screen name="ProfileMain" component={VenueProfileScreen} />
            <Stack.Screen name="ProfileEvents" component={MyEventsVenueScreen} />
            <Stack.Screen name="ProfileEventsDetails" component={MyVenueEventDetailsScreen} />
            <Stack.Screen name="ProfileApplications" component={VenueApplicationsScreen} />
        </Stack.Navigator>
    );
}

export default ProfileVenueNavigator;