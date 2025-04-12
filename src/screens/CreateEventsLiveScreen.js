import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../store/context/authContext';
import { getEventByIdApi } from '../apis/events';
import { useRoute } from '@react-navigation/native';
import apiURL from '../apis/apiURL';

const { width, height } = Dimensions.get('window');

const CreateEventsLiveScreen = ({ navigation, route }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  const token = useAuth().token;

  // const route=useRoute()

  const id = route.params.id;

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const fetchEventDetails = async (searchParams = {}) => {
    setLoading(true);
    try {
      const result = await getEventByIdApi(token, id);
      setEvent(result.event);
      // console.log(result.event)
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleCreate = () => {
    setIsInterested(!isInterested);
  };

  // Return loading state
  if (loading || !event) {
    return (
      <LinearGradient
        colors={[colors.background, colors.mapOverlay]}
        style={styles.loadingContainer}
      >
        <Text style={styles.loadingText}>Loading event details...</Text>
      </LinearGradient>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Default placeholder image for organizer avatar
  const placeholderAvatar = require('../../assets/images/organizer-avatar.png');
  // Default placeholder for event cover
  const placeholderCover = require('../../assets/images/fashion-event.jpg');
  // Placeholder attendees (since API doesn't include this info)
  const placeholderAttendees = [
    require('../../assets/images/attendee1.png'),
    require('../../assets/images/attendee2.png'),
    require('../../assets/images/attendee3.png'),
    require('../../assets/images/attendee4.png'),
  ];

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
          {/* Event Cover Image */}
          <View style={styles.coverImageContainer}>
            <Image
              source={{ uri: `${apiURL}/uploads/${event.event_photos[0]}` }} // Using placeholder since API provides photo URLs but not actual images
              style={styles.coverImage}
              resizeMode="cover"
            />

            {/* Event title and details overlay */}
            <View style={styles.eventOverlay}>
              <View style={styles.eventTitleContainer}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventStatusContainer}>
                  <View style={[styles.statusDot,
                  { backgroundColor: event.status === 'published' ? '#4CAF50' : '#FFC107' }]} />
                  <Text style={styles.eventStatus}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </Text>
                  <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
                </View>
                <Text style={styles.eventTime}>{event.start_time} - {event.end_time}</Text>
              </View>

              <Pressable
                style={styles.favoriteButton}
                onPress={toggleFavorite}
              >
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavorite ? "#FF4d4d" : colors.textPrimary}
                />
              </Pressable>
            </View>
          </View>

          {/* Organizer info */}
          <View style={styles.organizerContainer}>
            <View style={styles.organizerInfo}>
              <Image
                source={placeholderAvatar} // Using placeholder since we don't have actual image
                style={styles.organizerSmallAvatar}
              />
              <View>
                <Text style={styles.organizerName}>{event.venue.venue_name}</Text>
                <Text style={styles.organizerLabel}>Organizer</Text>
              </View>
            </View>
            <Pressable style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </Pressable>
          </View>

          {/* Event Details Card */}
          <View style={styles.detailsCard}>
            <Text style={styles.cardTitle}>Events Details</Text>

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={18} color={colors.textSecondary} style={styles.detailIcon} />
                <Text style={styles.detailText}>{formatDate(event.date)}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={18} color={colors.textSecondary} style={styles.detailIcon} />
                <Text style={styles.detailText}>{event.start_time} - {event.end_time}</Text>
              </View>
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Ionicons name="location-outline" size={18} color={colors.textSecondary} style={styles.detailIcon} />
                <Text style={styles.detailText}>{event.venue.venue_name}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="map-outline" size={18} color={colors.textSecondary} style={styles.detailIcon} />
                <Text style={styles.detailText}>{event.location.address}</Text>
              </View>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Event Description</Text>
              <Text style={styles.descriptionText}>{event.description}</Text>
            </View>
          </View>

          {/* Additional details */}
          <View style={styles.detailsCard}>
            <Text style={styles.cardTitle}>Additional Details</Text>

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Ionicons name="person-outline" size={18} color={colors.textSecondary} style={styles.detailIcon} />
                <Text style={styles.detailText}>Age: {event.age_restriction}+</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="shirt-outline" size={18} color={colors.textSecondary} style={styles.detailIcon} />
                <Text style={styles.detailText}>Dress Code: {event.dress_code}</Text>
              </View>
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Ionicons name="logo-instagram" size={18} color={colors.textSecondary} style={styles.detailIcon} />
                <Text style={styles.detailText}>{event.insta_handle}</Text>
              </View>
            </View>
          </View>

          {/* Event Rules Card */}
          <View style={styles.rulesCard}>
            <Text style={styles.cardTitle}>Event Rules</Text>

            {event.rules.map((rule, index) => (
              <View key={`rule-${index}`} style={styles.ruleItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.ruleText}>{rule}</Text>
              </View>
            ))}
          </View>

          {/* Influencer Requirements Card */}
          <View style={styles.offersCard}>
            <Text style={styles.cardTitle}>Influencer Requirements</Text>

            {event.influencer_requirements.map((requirement, index) => (
              <View key={`requirement-${index}`} style={styles.offerItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.offerText}>{requirement}</Text>
              </View>
            ))}
          </View>

          {/* Location Map */}
          <View style={styles.locationContainer}>
            <Text style={styles.cardTitle}>Location</Text>
            <View style={styles.mapContainer}>
              <Image
                source={require('../../assets/images/map-placeholder.png')}
                style={styles.mapImage}
                resizeMode="cover"
              />
              <View style={styles.mapMarker}>
                <Ionicons name="location" size={24} color="#FF4d4d" />
              </View>
            </View>

            {/* Attendees */}
            <View style={styles.attendeesContainer}>
              <View style={styles.avatarStack}>
                {placeholderAttendees.map((attendee, index) => (
                  <Image
                    key={`attendee-${index}`}
                    source={attendee}
                    style={[
                      styles.attendeeAvatar,
                      { left: index * 20 }
                    ]}
                  />
                ))}
              </View>

              {/* Interested Button */}
              <Pressable
                style={[
                  styles.interestedButton,
                  styles.interestedActiveButton
                ]}
                onPress={handleCreate}
              >
                <Text style={[
                  styles.interestedButtonText,
                  styles.interestedActiveButtonText
                ]}>
                  Create
                </Text>
              </Pressable>
            </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.textPrimary,
    fontSize: 16,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  organizerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  coverImageContainer: {
    width: width,
    height: height * 0.3,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  eventOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  eventTitleContainer: {
    flex: 1,
  },
  eventTitle: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 5,
  },
  eventStatus: {
    color: colors.textPrimary,
    fontSize: 14,
    marginRight: 10,
  },
  eventDate: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  eventTime: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  favoriteButton: {
    padding: 5,
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  organizerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  organizerSmallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  organizerName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  organizerLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  followButton: {
    backgroundColor: colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  followButtonText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  detailsCard: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginTop: 5,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
  },
  detailIcon: {
    marginRight: 8,
  },
  detailText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  descriptionContainer: {
    marginTop: 5,
  },
  descriptionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  descriptionText: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  rulesCard: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginTop: 0,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginRight: 10,
  },
  ruleText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  offersCard: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginTop: 0,
  },
  offerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  offerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  locationContainer: {
    margin: 15,
    marginTop: 0,
  },
  mapContainer: {
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 15,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapMarker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -12,
    marginTop: -24,
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarStack: {
    flexDirection: 'row',
    height: 40,
    width: 120,
    position: 'relative',
  },
  attendeeAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.background,
    position: 'absolute',
  },
  interestedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  interestedActiveButton: {
    backgroundColor: colors.accent,
  },
  interestedButtonText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '500',
  },
  interestedActiveButtonText: {
    color: colors.textPrimary,
  },
});

export default CreateEventsLiveScreen;