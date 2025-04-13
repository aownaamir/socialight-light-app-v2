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

  const event = eventsArray[0];

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

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


        <View style={styles.coverImageContainer}>
          <Image
            source={event.coverImage}
            style={styles.coverImage}
            resizeMode="cover"
          />


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


        <View style={styles.accountSection}>
          <Text style={styles.sectionTitle}>Account</Text>


          <View style={styles.attendeeCard}>
            <View style={styles.attendeeHeader}>
              <View style={styles.attendeeInfo}>
                <Image
                  source={event.attendees[0].avatar}
                  style={styles.attendeeAvatar}
                />
                <View>
                  <Text style={styles.attendeeName}>Bert Berišaj</Text>
                  <Text style={styles.attendeeUsername}>@__bertt</Text>
                </View>
              </View>
              <View style={styles.attendedBadge}>
                <Text style={styles.badgeText}>Attended</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.profileActions}>
              <Text style={styles.actionLink}>View Profile</Text>
              <Text style={styles.actionLink}>Reviewed!</Text>
            </View>
          </View>


          <View style={styles.attendeeCard}>
            <View style={styles.attendeeHeader}>
              <View style={styles.attendeeInfo}>
                <Image
                  source={event.attendees[1].avatar}
                  style={styles.attendeeAvatar}
                />
                <View>
                  <Text style={styles.attendeeName}>Bert Berišaj</Text>
                  <Text style={styles.attendeeUsername}>@__bertt</Text>
                </View>
              </View>
              <View style={styles.acceptedBadge}>
                <Text style={styles.badgeText}>Accepted</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.profileActions}>
              <Text style={styles.actionLink}>View Profile</Text>
              <Text style={styles.actionLink}>View OTP</Text>
            </View>
          </View>
        </View>


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
  attendeeCard: {
    marginBottom: 16,
    backgroundColor: 'rgba(10, 31, 31, 0.3)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  attendeeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
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
    fontWeight: '600',
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
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '100%',
  },
  profileActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actionLink: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  editButton: {
    backgroundColor: colors.accent,
    marginHorizontal: 16,
    marginTop: 10,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  editButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EventAnalyticsScreen;