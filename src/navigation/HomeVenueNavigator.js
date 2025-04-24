import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import HomeVenueScreen from "../screens/HomeVenueScreen";
import CreateEventsLiveScreen from "../screens/CreateEventsLiveScreen";
import AllEventsScreen from "../screens/AllEventsScreen";
import CustomHeader from "../components/CustomHeader";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

const HomeVenueNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ header: (props) => <CustomHeader {...props} /> }} initialRouteName="HomeMain">
            <Stack.Screen name="HomeMain" component={HomeScreen} />
            <Stack.Screen name="HomeCreate" component={CreateEventsLiveScreen} />
            <Stack.Screen name="HomeAllEvents" component={AllEventsScreen} />

        </Stack.Navigator>
    );
}

export default HomeVenueNavigator;