// RootNavigator.js
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../store/context/authContext';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import LoadingScreen from '../screens/LoadingScreen';
import InfluencerTabNavigator from './InfluencerTabNavigator';
import VenueTabNavigator from './VenueTabNavigator';
import CreateEventsLiveScreen from '../screens/CreateEventsLiveScreen';

const Stack = createStackNavigator();


const RootNavigator = () => {
  // const { isAuthenticated, loading } = useAuth();
  const isAuthenticated=useAuth().isAuthenticated;

  // Show loading spinner while checking auth state
  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>

    {!isAuthenticated ?  <AuthNavigator /> :  <TabNavigator />}
    {/* set auth user null */}
    {/* is user is dummy influencer then render only influencerNavigator */}
    {/* is user is dummy venue then render only venueNavigator */}


    {/* <TabNavigator /> */}
    {/* <InfluencerTabNavigator /> */}
    {/* <VenueTabNavigator /> */}
    {/* <CreateEventsLiveScreen /> */}


    </NavigationContainer>
       
    )
};


{/* <NavigationContainer>
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
     ) : ( 
        <Stack.Screen name="Main" component={TabNavigator} />
     )} 
  </Stack.Navigator>
</NavigationContainer> */}



export default RootNavigator;