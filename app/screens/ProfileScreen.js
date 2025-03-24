import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Screen from '../components/Screen';
import { COLORS, SPACING } from '../theme';

const ProfileScreen = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.profileContainer}>
          {/* Profile content will go here */}
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
  profileContainer: {
    flex: 1,
  },
});

export default ProfileScreen; 