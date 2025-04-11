import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { colors } from '../theme/index';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../store/context/authContext';
import apiURL from '../apis/apiURL';

const { width } = Dimensions.get('window');

const MyEventCard = ({ event, variant = 'horizontal' }) => {
  // console.log('event',event._id)
  const navigation = useNavigation()
  const user = useAuth().user;
  const id = event._id
  // console.log('idddddddd',id)


  const handleEventPress = () => {

    const navigateTo = user.role === "influencer" ? 'HomeDetails' : "HomeCreate"
    navigation.navigate('HomeTab', { screen: navigateTo, params: { id } });

  };

  // Horizontal card (used in HomeScreen)
  if (variant === 'horizontal') {
    return (
      <Pressable style={styles.horizontalCard} onPress={handleEventPress}>
        <ImageBackground
          source={{ uri: `${apiURL}/uploads/${event.event_photos[0]}` }}
          style={styles.horizontalImage}
          imageStyle={styles.horizontalImageStyle}
        >
          {event.date && (
            <View style={styles.dateChip}>
              <Text style={styles.dateText}>
                {event.date.includes('at') ? event.date.split(' at')[0] : event.date}
              </Text>
            </View>
          )}

          {event.status === 'Active' && (
            <View style={styles.statusChip}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{event.status}</Text>
            </View>
          )}

          <View style={styles.horizontalEventInfo}>
            <Text style={styles.eventName}>{event.title}</Text>
            {event.location && (
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                <Text style={styles.locationText}>
                  {event.location.address}
                </Text>
              </View>
            )}
          </View>

          <Pressable style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={18} color={colors.textPrimary} />
          </Pressable>
        </ImageBackground>
      </Pressable>
    );
  }

  // Vertical card (used in EventsScreen) 
  return (
    <Pressable
      style={styles.verticalCard}
      onPress={handleEventPress}
    >
      <Image source={{ uri: `${apiURL}/uploads/${event.event_photos[0]}` }} style={styles.verticalImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.verticalGradient}
      >
        <View style={styles.dateChip}>
          <Text style={styles.dateText}>{event.date}</Text>
        </View>

        <View style={styles.statusChip}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{event.status}</Text>
        </View>

        <View style={styles.verticalInfoContainer}>
          <View>
            <Text style={styles.eventName}>{event.title}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
              <Text style={styles.locationText}>
                {typeof event.location === 'string' ? event.location : event.location.address}
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textPrimary} />
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // Horizontal card styles
  horizontalCard: {
    width: width * 0.8,
    height: 200,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  horizontalImage: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  horizontalImageStyle: {
    borderRadius: 15,
  },
  horizontalEventInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 8,
  },

  // Vertical card styles
  verticalCard: {
    height: 200,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  verticalImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  verticalGradient: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 15,
  },
  verticalInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Unified styles for common elements
  dateChip: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 160, 133, 0.8)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  dateText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 5,
  },
  statusText: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '500',
  },
  eventName: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginLeft: 3,
  },
  favoriteButton: {
    position: 'absolute',
    right: 10,
    bottom: 42,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyEventCard;