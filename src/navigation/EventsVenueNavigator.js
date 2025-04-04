import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import CreateEventScreen from "../screens/CreateEventsScreen";
import VenueRequestScreen from "../screens/VenueRequestScreen";
import EventAnalyticsScreen from "../screens/EventAnalyticsScreen";

const Stack = createNativeStackNavigator();

const EventsVenueNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CreateEvent" component={CreateEventScreen}  />
            <Stack.Screen name="EventAnalytics" component={EventAnalyticsScreen}  />
        </Stack.Navigator>
);
}

export default EventsVenueNavigator;