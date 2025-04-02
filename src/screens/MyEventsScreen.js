import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { eventsArray } from '../data/data';
import MyEventCard from '../components/MyEventCard';

const MyEventsScreen = ({ navigation }) => {
  // Extract first 2 events as new events
  const newEvents = eventsArray.slice(0, 2);
  
  // Extract last 3 events as recent events
  const recentEvents = eventsArray.slice(2, 5);

  return (
    <LinearGradient
      colors={[colors.background, colors.mapOverlay]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>New</Text>
            {newEvents.map((event) => (
              <MyEventCard 
                key={event.id} 
                event={event} 
                onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}
              />
            ))}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Recent</Text>
            {recentEvents.map((event) => (
              <MyEventCard 
                key={event.id} 
                event={event}
                onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 12,
  },
});

export default MyEventsScreen;