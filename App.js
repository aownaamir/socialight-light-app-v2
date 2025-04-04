import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/store/context/authContext';

export default function App() {
    return (
    <AuthProvider>
    <SafeAreaProvider>
      <StatusBar style='light' />
      <RootNavigator />
    </SafeAreaProvider>
    </AuthProvider> 
  );
}

