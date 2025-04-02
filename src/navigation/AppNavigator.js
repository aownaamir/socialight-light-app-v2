import { NavigationContainer } from "@react-navigation/native"
import TabNavigator from "./TabNavigator.js"
import AuthNavigator from "./AuthNavigator.js"

const AppNavigator=()=>{
    return <NavigationContainer>
        <TabNavigator />
    </NavigationContainer>
}

export default AppNavigator;