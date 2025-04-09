import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import HomeVenueScreen from "../screens/HomeVenueScreen";
import CreateEventsLiveScreen from "../screens/CreateEventsLiveScreen";
import AllEventsScreen from "../screens/AllEventsScreen";

const Stack = createNativeStackNavigator();

const HomeVenueNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeMain">
            <Stack.Screen name="HomeMain" component={HomeVenueScreen} />
            {/* create===details */}
            <Stack.Screen name="HomeCreate" component={CreateEventsLiveScreen} />
            <Stack.Screen name="HomeAllEvents" component={AllEventsScreen} />

        </Stack.Navigator>
    );
}

export default HomeVenueNavigator;