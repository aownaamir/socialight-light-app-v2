import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import UserProfileScreen from "../screens/ProfileUserScreen";
import MyEventsScreen from "../screens/MyEventsScreen";
import EventsScreen from "../screens/EventsScreen";

const Stack = createNativeStackNavigator();

const ProfileInfluencerNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={UserProfileScreen}  />
            <Stack.Screen name="MyEvents" component={MyEventsScreen}  />
        </Stack.Navigator>
);
}

export default ProfileInfluencerNavigator;