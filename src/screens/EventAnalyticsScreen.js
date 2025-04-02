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
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { eventAnalytics, eventsArray } from '../data/data';

const { width, height } = Dimensions.get('window');

const EventAnalyticsScreen = ({ navigation, route }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const event=eventsArray[0]

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with back button and title */}
        {/* <View style={styles.header}>
          <Pressable 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Events Details</Text>
          <Image 
            source={require('../../assets/images/organizer-avatar.png')} 
            style={styles.organizerAvatar} 
          />
        </View> */}

        {/* Event Cover Image */}
        <View style={styles.coverImageContainer}>
          <Image 
            source={event.coverImage} 
            style={styles.coverImage} 
            resizeMode="cover"
          />
          
          {/* Event title and details overlay */}
          <View style={styles.eventDetailsContainer}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <View style={styles.eventStatusContainer}>
              <View style={styles.statusDot} />
              <Text style={styles.eventStatus}>{event.status}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
            </View>
            <Text style={styles.eventTime}>{event.time} • {event.location}</Text>
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

        {/* Stats Containers */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{event.stats.all}</Text>
            <Text style={styles.statLabel}>All</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{event.stats.approved}</Text>
            <Text style={styles.statLabel}>Approved</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{event.stats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        <View style={styles.statsRow2}>
          <View style={styles.statItemWide}>
            <Text style={styles.statValue}>{event.stats.attended}</Text>
            <Text style={styles.statLabel}>Attended</Text>
          </View>
          <View style={styles.statItemWide}>
            <Text style={styles.statValue}>{event.stats.unattended}</Text>
            <Text style={styles.statLabel}>Unattended</Text>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.accountSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          {/* First Attendee */}
          <View style={styles.attendeeItem}>
            <View style={styles.attendeeInfo}>
              <Image 
                source={event.attendees[0].avatar} 
                style={styles.attendeeAvatar} 
              />
              <View>
                <Text style={styles.attendeeName}>{event.attendees[0].name}</Text>
                <Text style={styles.attendeeUsername}>{event.attendees[0].username}</Text>
              </View>
            </View>
            <View style={styles.attendedBadge}>
              <Text style={styles.badgeText}>Attended</Text>
            </View>
          </View>
          
          {/* Second Attendee */}
          <View style={styles.attendeeItem}>
            <View style={styles.attendeeInfo}>
              <Image 
                source={event.attendees[1].avatar} 
                style={styles.attendeeAvatar} 
              />
              <View>
                <Text style={styles.attendeeName}>{event.attendees[1].name}</Text>
                <Text style={styles.attendeeUsername}>{event.attendees[1].username}</Text>
              </View>
            </View>
            <View style={styles.acceptedBadge}>
              <Text style={styles.badgeText}>Accepted</Text>
            </View>
          </View>
          
          {/* Profile Actions */}
          <View style={styles.profileActions}>
            <Text style={styles.actionLink}>View Profile</Text>
            <Text style={styles.actionLink}>Blacklisted</Text>
          </View>
          
          <View style={styles.profileActions}>
            <Text style={styles.actionLink}>View Profile</Text>
            <Text style={styles.actionLink}>View QTR</Text>
          </View>
        </View>

        {/* Edit Button */}
        <Pressable style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit event</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.background,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
  },
  organizerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
  eventDetailsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 16,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  eventTitle: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
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
    marginRight: 8,
  },
  eventDate: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  eventTime: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  favoriteButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    zIndex: 10,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 0,
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  statsRow2: {
    flexDirection: 'row',
    marginHorizontal: 0,
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  statItem: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.1)',
  },
  statItemWide: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.1)',
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  accountSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  attendeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  attendeeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  attendeeName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  attendeeUsername: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  attendedBadge: {
    backgroundColor: colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  acceptedBadge: {
    backgroundColor: colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  profileActions: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  actionLink: {
    color: colors.textSecondary,
    fontSize: 14,
    marginRight: 20,
  },
  editButton: {
    backgroundColor: colors.accent,
    marginHorizontal: 16,
    marginTop: 10,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EventAnalyticsScreen;