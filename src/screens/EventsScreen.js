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
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { eventsArray } from '../data/data';
import EventCard from '../components/EventCard'; // Import the EventCard component

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
          <Text style={styles.sectionTitle}>Your events</Text>

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
          <View style={styles.contactContainer}>
            <Text style={styles.contactTitle}>Contact us</Text>
            
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/images/logo-text.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.contactInfoContainer}>
              <Text style={styles.contactInfoTitle}>Contact information</Text>
              <Text style={styles.contactInfoText}>info@socialight.vip</Text>
              <Text style={styles.contactInfoText}>www.socialight.vip</Text>
              <Text style={styles.contactInfoText}>Athens, Greece</Text>
            </View>

            <Text style={styles.tagline}>Unlock Exclusive Experiences with Socialight</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
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
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  contactContainer: {
    padding: 20,
    paddingTop: 10,
  },
  contactTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  contactInfoContainer: {
    marginBottom: 20,
  },
  contactInfoTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 8,
  },
  contactInfoText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 3,
  },
  tagline: {
    color: colors.textSecondary,
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 30,
  },
});

export default EventsScreen;