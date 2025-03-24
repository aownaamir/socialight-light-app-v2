import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Screen from '../components/Screen';
import { COLORS, SPACING } from '../theme';

const DiscoverScreen = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Discover Events</Text>
        {/* Event categories will go here */}
        <View style={styles.categoriesContainer}>
        </View>
        {/* Event list will go here */}
        <View style={styles.eventsContainer}>
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
  categoriesContainer: {
    marginBottom: SPACING.m,
  },
  eventsContainer: {
    flex: 1,
  },
});

export default DiscoverScreen; 