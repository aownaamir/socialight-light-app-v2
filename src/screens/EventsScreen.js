import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { eventsArray } from '../data/data';
import EventCard from '../components/EventCard';
import ContactSection from '../components/ContactSection';

const EventsScreen = ({ navigation }) => {
  const activeEvents = eventsArray.filter(event => event.status === 'Active');
  
  // const handleEventPress = (id) => {
  //   // Navigate to event details screen
  //   navigation.navigate('EventDetails', { id });
  // };
 
  return (
    <LinearGradient
      colors={[colors.background, colors.mapOverlay]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        {/* Create Event Button */}
        <TouchableOpacity 
          style={styles.createEventButton}
          onPress={() => navigation.navigate('CreateEvent')}
        >
          <Text style={styles.createEventText}>Create a new event</Text>
          <Ionicons name="add-outline" size={20} color={colors.textPrimary} />
        </TouchableOpacity>

        {/* Events List */}
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your events</Text>
          </View>

          {/* Event Cards - Using the modified EventCard component with 'vertical' variant */}
          {activeEvents.map((event) => (
            <EventCard 
              key={event.id}
              event={event}
              // onPress={handleEventPress.bind(this,event.id)}
              variant="vertical" // Specify the vertical variant
            />
          ))}

          {/* Contact Information */}
          <ContactSection />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  createEventButton: {
    flexDirection: 'row',
    backgroundColor: colors.accent,
    margin: 20,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  createEventText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 5,
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
  },
  contactSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
    paddingTop: 10,
  },
  contactCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
  },
  contactContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  logoLargeText: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '700',
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 5,
  },
  contactText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 3,
  },
  tagline: {
    color: colors.textSecondary,
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
  },
});

export default EventsScreen;