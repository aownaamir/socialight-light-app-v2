import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Screen from '../components/Screen';
import { COLORS, SPACING } from '../theme';

const SettingsScreen = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.settingsContainer}>
          {/* Settings options will go here */}
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.m,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.m,
  },
  settingsContainer: {
    flex: 1,
  },
});

export default SettingsScreen; 