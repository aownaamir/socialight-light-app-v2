import { createStackNavigator } from "@react-navigation/stack";
import LoadingScreen from "../screens/LoadingScreen";
import SignUpChooseScreen from "../screens/SignUpChooseScreen";
import LogInScreen from "../screens/LogInScreen";
import SignUpInfluencerScreen from "../screens/SignUpInfluencerScreen";
import SignUpVenuesScreen from "../screens/SignUpVenuesScreen";

const Stack = createStackNavigator();

const AuthNavigator=()=>{
    return (
    <Stack.Navigator 
        initialRouteName="Loading"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="UserType" component={SignUpChooseScreen} />
        <Stack.Screen name="Login" component={LogInScreen} />
        <Stack.Screen name="InfluencerSignup" component={SignUpInfluencerScreen} />
        <Stack.Screen name="VenueSignup" component={SignUpVenuesScreen} />
      </Stack.Navigator>
    );
}

export default AuthNavigator;