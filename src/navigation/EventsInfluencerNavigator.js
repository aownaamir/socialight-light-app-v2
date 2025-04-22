import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import CreateEventScreen from "../screens/CreateEventsScreen";
import VenueRequestScreen from "../screens/VenueRequestScreen";
import EventAnalyticsScreen from "../screens/EventAnalyticsScreen";
import CustomHeader from "../components/CustomHeader";

const Stack = createNativeStackNavigator();

const EventsInfluencerNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ header: (props) => <CustomHeader {...props} /> }} initialRouteName="EventsRequestVenue">
            <Stack.Screen name="EventsRequestVenue" component={VenueRequestScreen} />
        </Stack.Navigator>
    );
}

export default EventsInfluencerNavigator;