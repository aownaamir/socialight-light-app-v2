import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  Pressable,
  Platform,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import EventCard from '../components/EventCard';
import PopularEventsCarousel from '../components/PopularEventsCarousel';
import { getEventsApi } from '../apis/events';
import { useAuth } from '../store/context/authContext';
import ContactSection from '../components/ContactSection';
import SwipeWrapper from '../navigation/SwipeWrapper';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [activeEvents, setActiveEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const { token, user } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async (params = {}) => {
    setLoading(true);
    try {
      const result = await getEventsApi(token, {
        page: params.page || pagination.page,
        limit: params.limit || pagination.limit,
      });

      setActiveEvents(result.events.filter(event => event.status === 'published'));
      setUpcomingEvents(result.events);
      setPagination(result.pagination);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim() !== '') {
        performSearch(query);
      }
    }, 500),
    []
  );

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    setIsSearching(true);

    if (text.trim() === '') {
      setIsSearchMode(false);
      fetchEvents(); // Reset to normal view
    } else {
      setIsSearchMode(true);
      debouncedSearch(text);
    }
  };

  const performSearch = async (query) => {
    setLoading(true);
    try {
      const result = await getEventsApi(token, {
        page: pagination.page,
        limit: pagination.limit,
        search: query,
      });

      // Store search results in their own state
      setSearchResults(result.events);
      setPagination(result.pagination);
    } catch (error) {
      console.error('Error searching events:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const handleCreateEvent = () => {
    navigation.navigate('EventsTab', {
      screen: 'EventsCreate'
    });
  };


  const renderLoadingPlaceholder = () => (
    <View style={styles.loadingPlaceholder}>
      <ActivityIndicator size="large" color={colors.accent} />
    </View>
  );

  return (
    // <SwipeWrapper>
    <LinearGradient
      colors={[colors.background, colors.mapOverlay]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Search Bar with Create event Button */}
          {/* Search Bar with Create event Button */}
          {/* Search Bar with Create event Button */}
          <View style={styles.searchAndButtonContainer}>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={colors.textSecondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search here..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={handleSearchChange}
              />
              {searchQuery ? (
                <Pressable onPress={() => {
                  setSearchQuery('');
                  setIsSearchMode(false);
                  fetchEvents(); // Reset to normal view
                }}>
                  <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
                </Pressable>
              ) : (
                <Ionicons name="mic" size={20} color={colors.textSecondary} />
              )}
            </View>

            {/* Create event Button */}
            {user.role === 'venue' && <Pressable
              style={styles.createEventButton}
              onPress={handleCreateEvent}
            >
              <LinearGradient
                colors={[colors.accent, '#034946']}
                style={styles.createEventGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Feather name="plus" size={16} color={colors.textPrimary} />
                <Text style={styles.createEventText}>Create event</Text>
              </LinearGradient>
            </Pressable>}
          </View>

          {/* Conditional rendering based on search mode */}
          {isSearchMode ? (
            // Search Mode - always show only search results section
            <>
              {/* Search Status Indicator */}
              <View style={styles.searchStatusContainer}>
                <Text style={styles.searchStatusText}>
                  {isSearching ? 'Searching...' : `Search results for "${searchQuery}"`}
                </Text>
              </View>

              {/* Search Results Section */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Search Results</Text>
              </View>

              {/* Search Results Display */}
              {loading ? (
                renderLoadingPlaceholder()
              ) : (
                searchResults.length > 0 ? (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.eventsScroll}
                  >
                    {searchResults.map(event => (
                      <EventCard
                        key={event._id || event.id}
                        event={event}
                      />
                    ))}
                  </ScrollView>
                ) : (
                  <View style={styles.noEventsContainer}>
                    <Text style={styles.noEventsText}>No events found matching your search</Text>
                  </View>
                )
              )}
            </>
          ) : (
            // Normal Mode - show both regular sections
            <>
              {/* Most Popular Events Section */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Most popular events</Text>
                <Pressable onPress={() => navigation.navigate('HomeAllEvents')}>
                  <Text style={styles.viewAllText}>view all</Text>
                </Pressable>
              </View>

              {/* Popular Events Carousel with Loading State */}
              {loading ? (
                renderLoadingPlaceholder()
              ) : activeEvents.length > 0 ? (
                <PopularEventsCarousel events={activeEvents} navigation={navigation} />
              ) : (
                <View style={styles.noEventsContainer}>
                  <Text style={styles.noEventsText}>No popular events found</Text>
                </View>
              )}

              {/* Upcoming Events Section */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Upcoming events</Text>
                <Pressable>
                  <Text style={styles.viewAllText}>view all</Text>
                </Pressable>
              </View>

              {/* Upcoming Events Horizontal Scroll with Loading State */}
              {loading ? (
                renderLoadingPlaceholder()
              ) : (
                upcomingEvents.length > 0 ? (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.eventsScroll}
                  >
                    {upcomingEvents.map(event => (
                      <EventCard
                        key={event._id || event.id}
                        event={event}
                      />
                    ))}
                  </ScrollView>
                ) : (
                  <View style={styles.noEventsContainer}>
                    <Text style={styles.noEventsText}>No upcoming events found</Text>
                  </View>
                )
              )}
            </>
          )}

          {/* Partners Section - shows in both modes */}
          <View style={styles.partnersSection}>
            {/* Partners content */}
          </View>

          {/* Contact Section - shows in both modes */}
          <ContactSection />


        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
    // </SwipeWrapper>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  loadingPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  noEventsContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  noEventsText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  searchAndButtonContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    height: 45,
  },
  searchInput: {
    flex: 1,
    height: 45,
    paddingLeft: 10,
    color: colors.textPrimary,
  },
  createEventButton: {
    borderRadius: 25,
    overflow: 'hidden',
    height: 45,
    elevation: 3,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  createEventGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    height: '100%',
    borderRadius: 25,
  },
  createEventText: {
    color: colors.textPrimary,
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 15,
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
  viewAllText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  eventsScroll: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  partnersSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  partnersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center',
  },
  partnerDivider: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  partnerLogo: {
    width: width * 0.18,
    height: 35,
  },
  dividerLine: {
    width: 1,
    height: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginLeft: 10,
  },

  contactSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  contactCardContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.24)'
  },
  contactCard: {
    padding: 15,
  },
  contactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoSide: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contactLogo: {
    width: '100%',
    height: '100%',
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
    marginTop: 25,
    textAlign: 'center',
  },
  searchStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchStatusText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  clearSearchText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '600',
  },
  searchStatusContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchStatusText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});

export default HomeScreen;