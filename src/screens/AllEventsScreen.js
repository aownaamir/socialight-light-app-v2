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
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import EventCard from '../components/EventCard';
import ContactSection from '../components/ContactSection';
import { getEventsApi } from '../apis/events';
import { useAuth } from '../store/context/authContext';

const AllEventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const { token } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async (searchParams = {}) => {
    setLoading(true);
    try {
      // You can pass any query parameters based on user filters
      const result = await getEventsApi(token, {
        page: pagination.page,
        limit: pagination.limit,
      });   
      setEvents(result.events);
      // console.log(events)
      setPagination(result.pagination);
    } catch (error) {
      console.error('Error fetching events:', error);
      // You could add error state handling here if needed
    } finally {
      setLoading(false);
    }
  };

  // Load more function for pagination
  const loadMoreEvents = () => {
    if (pagination.page < pagination.totalPages) {
      fetchEvents({ page: pagination.page + 1 });
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
        <TouchableOpacity 
          style={styles.createEventButton}
          onPress={() => navigation.navigate('CreateEvent')}
        >
          <Text style={styles.createEventText}>Create a new event</Text>
          <Ionicons name="add-outline" size={20} color={colors.textPrimary} />
        </TouchableOpacity>

        {loading && events.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.accent} />
            <Text style={styles.loadingText}>Loading events...</Text>
          </View>
        ) : (
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your events</Text>
            </View>

            {events.length > 0 ? (
              events.map((event) => (
                <EventCard 
                  key={event._id || event.id}
                  event={event}
                  variant="vertical"
                />
              ))
            ) : (
              <View style={styles.noEventsContainer}>
                <Text style={styles.noEventsText}>No events found</Text>
              </View>
            )}

            {/* Loading more indicator */}
            {loading && events.length > 0 && (
              <View style={styles.loadingMoreContainer}>
                <ActivityIndicator size="small" color={colors.accent} />
                <Text style={styles.loadingMoreText}>Loading more...</Text>
              </View>
            )}

            {/* Load More Button - only show if there are more pages */}
            {!loading && pagination.page < pagination.totalPages && (
              <TouchableOpacity 
                style={styles.loadMoreButton}
                onPress={loadMoreEvents}
              >
                <Text style={styles.loadMoreText}>Load more events</Text>
              </TouchableOpacity>
            )}

            {/* Contact Information */}
            <ContactSection />
          </ScrollView>
        )}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.textPrimary,
    fontSize: 16,
    marginTop: 10,
  },
  noEventsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noEventsText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  loadingMoreContainer: {
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loadingMoreText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginLeft: 10,
  },
  loadMoreButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  loadMoreText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  // other styles remain the same
});

export default AllEventsScreen;