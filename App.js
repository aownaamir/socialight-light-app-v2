import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignUpChooseScreen from './src/screens/SignUpChooseScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import SignUpInfluencerScreen from './src/screens/SignUpInfluencerScreen';
import SignUpInfluencerPersonalInfoScreen from './src/screens/SignUpInfluencerPersonalInfoScreen';
import SignUpInfluencerPersonalInfo2Screen from './src/screens/SignUpInfluencerPersonalInfo2Screen';
import SignUpInfluencerPersonalInfo3Screen from './src/screens/SignUpInfluencerPersonalInfo3Screen';
import EventDetailsScreen from './src/screens/EventDetailsScreen';
import MyEventsScreen from './src/screens/MyEventsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RejectedScreen from './src/screens/RejectedScreen';
import EventsScreen from './src/screens/EventsScreen';
import CreateEventsLiveScreen from './src/screens/CreateEventsLiveScreen';
import CreateEventsScreen from './src/screens/CreateEventsScreen';
import SignUpVenuesScreen from './src/screens/SignUpVenuesScreen';
import VenueRequestScreen from './src/screens/VenueRequestScreen';
import EventAnalyticsScreen from './src/screens/EventAnalyticsScreen';
import OTPScreen from './src/screens/OTPScreen';
import VenueProfileScreen from './src/screens/VenueProfileScreen';
import UserProfileScreen from './src/screens/ProfileUserScreen';
import LogInScreen from './src/screens/LogInScreen';
import HomeScreen from './src/screens/HomeScreen';
import WaitlistScreen from './src/screens/WaitlistScreen';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style='light' />
      {/* <AppNavigator /> */}
      <RootNavigator />
      
    </SafeAreaProvider>
  );
}

{/* <LoadingScreen /> */}
{/* <SignUpChooseScreen /> */}
{/* <LogInScreen /> */}
{/* <SignUpVenuesScreen /> */}
{/* <SignUpInfluencerScreen /> */}
{/* <SignUpInfluencerPersonalInfoScreen />    //test */}
{/* <SignUpInfluencerPersonalInfo2Screen /> */}
{/* <SignUpInfluencerPersonalInfo3Screen /> */}
{/* <HomeScreen /> */}
{/* <EventsScreen /> */}
{/* <MyEventsScreen /> */}
{/* <EventDetailsScreen /> */}
{/* <EventAnalyticsScreen /> */}
{/* <ProfileScreen />   */}
{/* <VenueProfileScreen /> */}
{/* <UserProfileScreen /> */}
{/* <CreateEventsLiveScreen /> */}
{/* <CreateEventsScreen /> */}
{/* <VenueRequestScreen /> */}
{/* <RejectedScreen /> */}
{/* <OTPScreen /> */}
{/* <WaitlistScreen /> */}