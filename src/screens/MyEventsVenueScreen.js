import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import EventCard from '../components/EventCard';
import ContactSection from '../components/ContactSection';
import { useAuth } from '../store/context/authContext';
import { getVenueEventsApi } from '../apis/events';
import VenueEventCard from '../components/VenueEventCard';

const MyEventsVenueScreen = ({ navigation }) => {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [token]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await getVenueEventsApi(token);
      // Filter active events if your API doesn't filter them already
      setEvents(response.events);
      setError(null);
    } catch (err) {
      setError('Failed to load events. Please try again.');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.mapOverlay]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        {/* Create Event Button */}
        <Pressable
          style={styles.createEventButton}
          onPress={() => navigation.navigate('EventsTab', { screen: "EventsCreate" })}
        >
          <Text style={styles.createEventText}>Create a new event</Text>
          <Ionicons name="add-outline" size={20} color={colors.textPrimary} />
        </Pressable>

        {/* Events List */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your events</Text>
            {!loading && !error && (
              <TouchableOpacity onPress={fetchEvents}>
                <Ionicons name="refresh-outline" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Loading State */}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.accent} />
              <Text style={styles.loadingText}>Loading events...</Text>
            </View>
          )}

          {/* Error State */}
          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle-outline" size={40} color={colors.error || '#ff4d4d'} />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={fetchEvents}
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Event Cards - Using the modified EventCard component with 'vertical' variant */}
          {!loading && !error && events.length === 0 && (
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={48} color={colors.textSecondary} />
              <Text style={styles.emptyText}>You don't have any active events</Text>
              <TouchableOpacity
                style={[styles.createEventButton, styles.emptyCreateButton]}
                onPress={() => navigation.navigate('CreateEvent')}
              >
                <Text style={styles.createEventText}>Create one now</Text>
                <Ionicons name="add-outline" size={20} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
          )}

          {!loading && !error && events.map((event) => (
            <VenueEventCard
              source='my'
              key={event._id}
              event={event}
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
  loadingContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: colors.textSecondary,
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: colors.textSecondary,
    marginTop: 10,
    marginBottom: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  retryButtonText: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  emptyCreateButton: {
    margin: 0,
    marginTop: 10,
  },
});

export default MyEventsVenueScreen;