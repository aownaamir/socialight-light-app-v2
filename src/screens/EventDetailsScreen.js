import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { eventDetails, eventsArray } from '../data/data';
import ContactSection from '../components/ContactSection';

const { width, height } = Dimensions.get('window');

const EventDetailsScreen = ({ navigation, route }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  
  const id = route.params.id;
  const event = eventsArray.find(event => event.id === id);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleInterested = () => {
    setIsInterested(!isInterested);
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.mapOverlay]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Event Cover Image */}
          <View style={styles.coverImageContainer}>
            <Image 
              source={event.coverImage} 
              style={styles.coverImage} 
              resizeMode="cover"
            />
            
            {/* Event title and details overlay */}
            <View style={styles.eventOverlay}>
              <View style={styles.eventTitleContainer}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventStatusContainer}>
                  <View style={styles.statusDot} />
                  <Text style={styles.eventStatus}>{event.status}</Text>
                  <Text style={styles.eventDate}>{event.date}</Text>
                </View>
                <Text style={styles.eventTime}>{event.time}</Text>
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
                source={event.organizer.avatar} 
                style={styles.organizerSmallAvatar} 
              />
              <View>
                <Text style={styles.organizerName}>{event.organizer.name}</Text>
                <Text style={styles.organizerLabel}>Organizer</Text>
              </View>
            </View>
            <Pressable style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </Pressable>
          </View>

          {/* Event Details Card */}
          <View style={styles.cardContainer}>
            <Text style={styles.sectionTitle}>Events Details</Text>
            
            {/* Modified these rows to better handle long text */}
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={18} color={colors.textSecondary} style={styles.detailIcon} />
                <Text style={styles.detailText}>24 March, 2025</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={18} color={colors.textSecondary} style={styles.detailIcon} />
                <Text style={styles.detailText}>5 PM - 8 PM</Text>
              </View>
            </View>
            
            {/* Location gets its own full-width row */}
            <View style={styles.detailFullRow}>
              <Ionicons name="location-outline" size={18} color={colors.textSecondary} style={styles.detailIcon} />
              <Text style={styles.detailText}>{event.location}</Text>
            </View>
            
            {/* Address gets its own full-width row */}
            <View style={styles.detailFullRow}>
              <Ionicons name="map-outline" size={18} color={colors.textSecondary} style={styles.detailIcon} />
              <Text style={styles.detailText} numberOfLines={2}>{event.fullAddress}</Text>
            </View>
            
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Event Description</Text>
              <Text style={styles.descriptionText}>{event.description}</Text>
            </View>
          </View>

          {/* Event Rules Card */}
          <View style={styles.cardContainer}>
            <Text style={styles.sectionTitle}>Event Rules</Text>
            
            {event.rules.map((rule, index) => (
              <View key={`rule-${index}`} style={styles.bulletItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.bulletText}>{rule}</Text>
              </View>
            ))}
          </View>

          {/* Offer to applicants Card */}
          <View style={styles.cardContainer}>
            <Text style={styles.sectionTitle}>Offer to applicants</Text>
            
            {event.offers.map((offer, index) => (
              <View key={`offer-${index}`} style={styles.bulletItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.bulletText}>{offer}</Text>
              </View>
            ))}
          </View>

          {/* Location Map */}
          <View style={styles.locationSection}>
            <Text style={styles.sectionTitle}>Location</Text>
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
                {event.attendees.map((attendee, index) => (
                  <Image 
                    key={`attendee-${index}`}
                    source={attendee.avatar} 
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
                  isInterested && styles.interestedActiveButton
                ]}
                onPress={toggleInterested}
              >
                <Text style={[
                  styles.interestedButtonText,
                  isInterested && styles.interestedActiveButtonText
                ]}>
                  I am Interested
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Contact Section - Replicated from base screens */}
          {/* <ContactSection /> */}
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
    marginBottom: 20,
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
  // Card containers - synced with base screens
  cardContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  // Section titles - synced with base screens
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
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
  // New style for full-width detail items
  detailFullRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  detailIcon: {
    marginRight: 8,
    minWidth: 18, // Fixed width for alignment
  },
  detailText: {
    color: colors.textSecondary,
    fontSize: 14,
    flex: 1, // Allow text to take remaining space
    flexWrap: 'wrap', // Ensure text wraps properly
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
  // Bullet items - standardized
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textPrimary,
    marginRight: 10,
  },
  bulletText: {
    color: colors.textSecondary,
    fontSize: 14,
    flex: 1, // Allow text to wrap properly
  },
  locationSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  mapContainer: {
    height: 180,
    borderRadius: 12,
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
    marginBottom: 20,
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
  // Interest button - synced with other buttons
  interestedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
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
  // Contact section - copied from base screens
  contactSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
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

export default EventDetailsScreen;