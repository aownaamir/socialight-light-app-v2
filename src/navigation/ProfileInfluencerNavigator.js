import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import UserProfileScreen from "../screens/ProfileUserScreen";
import EventsScreen from "../screens/EventsScreen";
import MyEventsInfluencerScreen from "../screens/MyEventsInfluencerScreen";

const Stack = createNativeStackNavigator();

const ProfileInfluencerNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ProfileMain">
            <Stack.Screen name="ProfileMain" component={UserProfileScreen} />
            <Stack.Screen name="ProfileEvents" component={MyEventsInfluencerScreen} />
        </Stack.Navigator>
    );
}

export default ProfileInfluencerNavigator;