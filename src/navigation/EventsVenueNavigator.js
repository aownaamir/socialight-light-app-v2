import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import CreateEventScreen from "../screens/CreateEventsScreen";
import VenueRequestScreen from "../screens/VenueRequestScreen";
import EventAnalyticsScreen from "../screens/EventAnalyticsScreen";
import UpdateEventScreen from "../screens/UpdateEventScreen";
import CustomHeader from "../components/CustomHeader";

const Stack = createNativeStackNavigator();

const EventsVenueNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ header: (props) => <CustomHeader {...props} /> }} initialRouteName="EventsCreate">
            <Stack.Screen name="EventsCreate" component={CreateEventScreen} />
            <Stack.Screen name="EventsUpdate" component={UpdateEventScreen} />
            <Stack.Screen name="EventsAnalytics" component={EventAnalyticsScreen} />
        </Stack.Navigator>
    );
}

export default EventsVenueNavigator;