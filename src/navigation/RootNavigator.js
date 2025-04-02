import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator.js";
import TabNavigator from "./TabNavigator.js";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const RootNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Check if user is authenticated on app load
//     const checkAuthStatus = async () => {
//       const authStatus = await checkIfUserIsAuthenticated();
//       setIsAuthenticated(authStatus);
//       setIsLoading(false);
//     };
    
//     checkAuthStatus();
//   }, []);

//   if (isLoading) {
//     return null; // Or a loading component
//   }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {!isAuthenticated ? ( */}
            <Stack.Screen name="Auth" component={AuthNavigator} />
        {/* ) : ( */}
            <Stack.Screen name="Main" component={TabNavigator} />
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;