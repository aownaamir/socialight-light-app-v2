import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
  Pressable,
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

const { width, height } = Dimensions.get('window');

const HomeInfluencerScreen = ({ navigation }) => {
  const [activeEvents, setActiveEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
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
        page: searchParams.page || pagination.page,
        limit: searchParams.limit || pagination.limit,
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

  const handleRequestVenue = () => {
    navigation.navigate('EventsTab', {
      screen: 'EventsRequestVenue'
    })
    // console.log('Create event pressed');
  };

  // Content placeholder while loading
  const renderLoadingPlaceholder = () => (
    <View style={styles.loadingPlaceholder}>
      <ActivityIndicator size="large" color={colors.accent} />
    </View>
  );

  return (
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
          <View style={styles.searchAndButtonContainer}>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={colors.textSecondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search here..."
                placeholderTextColor={colors.textSecondary}
              />
              <Ionicons name="mic" size={20} color={colors.textSecondary} />
            </View>

            {/* Request venue Button */}
            <TouchableOpacity
              style={styles.createEventButton}
              onPress={handleRequestVenue}
            >
              <LinearGradient
                colors={[colors.accent, '#034946']}
                style={styles.createEventGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Feather name="plus" size={16} color={colors.textPrimary} />
                <Text style={styles.createEventText}>Request venue</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Most Popular Events Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Most popular event</Text>
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
            <Text style={styles.sectionTitle}>Upcoming event</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>view all</Text>
            </TouchableOpacity>
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

          {/* Partners Section */}
          <View style={styles.partnersSection}>
            <Text style={styles.sectionTitle}>Socialight partners</Text>
            <View style={styles.partnersContainer}>
              <View style={styles.partnerDivider}>
                <Image
                  source={require('../../assets/images/jack-daniels.png')}
                  style={styles.partnerLogo}
                  resizeMode="cover"
                />
                <View style={styles.dividerLine} />
              </View>
              <View style={styles.partnerDivider}>
                <Image
                  source={require('../../assets/images/captain-morgan.png')}
                  style={styles.partnerLogo}
                  resizeMode="cover"
                />
                <View style={styles.dividerLine} />
              </View>
              <View style={styles.partnerDivider}>
                <Image
                  source={require('../../assets/images/gordons.png')}
                  style={styles.partnerLogo}
                  resizeMode="cover"
                />
                <View style={styles.dividerLine} />
              </View>
              <View style={styles.partnerDivider}>
                <Image
                  source={require('../../assets/images/redbull.png')}
                  style={styles.partnerLogo}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>

          {/* Contact Section */}
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
  // Contact Section Styles with BlurView
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
});

export default HomeInfluencerScreen;