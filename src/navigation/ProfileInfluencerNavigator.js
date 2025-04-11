import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import UserProfileScreen from "../screens/ProfileUserScreen";
import EventsScreen from "../screens/EventsScreen";
import MyEventsInfluencerScreen from "../screens/MyEventsInfluencerScreen";
import EditInfluencerProfileScreen from "../screens/EditInfluencerProfileScreen";

const Stack = createNativeStackNavigator();

const ProfileInfluencerNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ProfileMain">
            <Stack.Screen name="ProfileMain" component={UserProfileScreen} />
            <Stack.Screen name="ProfileEvents" component={MyEventsInfluencerScreen} />
            <Stack.Screen name="ProfileUpdate" component={EditInfluencerProfileScreen} />
        </Stack.Navigator>
    );
}

export default ProfileInfluencerNavigator;