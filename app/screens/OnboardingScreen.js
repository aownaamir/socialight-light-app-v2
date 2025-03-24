import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import { COLORS, SPACING } from '../theme';

const OnboardingScreen = () => {
  const navigation = useNavigation();

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Socialight</Text>
          <Text style={styles.subtitle}>Connect with venues and create amazing experiences</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.m,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.m,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.grey,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  footer: {
    paddingBottom: SPACING.xl,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.m,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen; 