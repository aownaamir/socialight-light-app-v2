import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import HomeInfluencerScreen from "../screens/HomeInfluencerScreen";
import AllEventsScreen from "../screens/AllEventsScreen";
import CustomHeader from "../components/CustomHeader";

const Stack = createNativeStackNavigator();

const HomeInfluencerNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ header: (props) => <CustomHeader {...props} /> }} initialRouteName="HomeMain">
            <Stack.Screen name="HomeMain" component={HomeInfluencerScreen} />
            <Stack.Screen name="HomeDetails" component={EventDetailsScreen} />
            <Stack.Screen name="HomeAllEvents" component={AllEventsScreen} />
        </Stack.Navigator>
    );
}

export default HomeInfluencerNavigator;