import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import HomeInfluencerScreen from "../screens/HomeInfluencerScreen";

const Stack = createNativeStackNavigator();

const HomeInfluencerNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeInfluencerScreen}  />
            <Stack.Screen name="Details" component={EventDetailsScreen}  />
        </Stack.Navigator>
);
}

export default HomeInfluencerNavigator;