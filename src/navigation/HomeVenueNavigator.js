import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import HomeVenueScreen from "../screens/HomeVenueScreen";

const Stack = createNativeStackNavigator();

const HomeVenueNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeVenueScreen}  />
            <Stack.Screen name="Details" component={EventDetailsScreen}  />
        </Stack.Navigator>
);
}

export default HomeVenueNavigator;