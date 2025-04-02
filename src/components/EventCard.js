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

const { width } = Dimensions.get('window');

const EventCard = ({ event, variant = 'horizontal' }) => {

  const navigation=useNavigation()

  const handleEventPress = (id) => {
    // Navigate to event details screen
    navigation.navigate('Details', { id: event.id });
    // console.log(id)
  };

  // Horizontal card (used in HomeScreen)
  if (variant === 'horizontal') {
    return (
      <Pressable style={styles.horizontalCard} onPress={handleEventPress}>
        <ImageBackground
          source={event.coverImage || event.image}
          style={styles.horizontalImage}
          imageStyle={styles.horizontalImageStyle}
        >
          {event.date && (
            <View style={styles.horizontalDateChip}>
              <Text style={styles.dateText}>
                {event.date.includes('at') ? event.date.split(' at')[0] : event.date}
              </Text>
            </View>
          )}
          
          {event.status === 'Active' && (
            <View style={styles.horizontalActiveChip}>
              <Text style={styles.activeText}>{event.status}</Text>
            </View>
          )}
          
          <View style={styles.horizontalEventInfo}>
            <Text style={styles.eventName}>{event.title}</Text>
            {event.location && (
              <View style={styles.locationContainer}>
                <Ionicons name="location" size={12} color={colors.textSecondary} />
                <Text style={styles.locationText}>{event.location}</Text>
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
      <Image source={event.image} style={styles.verticalImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.verticalGradient}
      >
        <View style={styles.verticalDateContainer}>
          <Text style={styles.dateText}>{event.date}</Text>
        </View>

        <View style={styles.verticalStatusContainer}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{event.status}</Text>
        </View>

        <View style={styles.verticalInfoContainer}>
          <View>
            <Text style={styles.eventName}>{event.title}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
              <Text style={styles.locationText}>{event.location}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textPrimary} />
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // Horizontal card styles (from original EventCard)
  horizontalCard: {
    width: width * 0.6,
    height: 180,
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
  horizontalDateChip: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  horizontalActiveChip: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(22, 160, 133, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  horizontalEventInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 8,
  },
  
  // Vertical card styles (from EventsScreen)
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
  verticalDateContainer: {
    alignSelf: 'flex-end',
    backgroundColor: colors.accent,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  verticalStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    position: 'absolute',
    top: 15,
    left: 15,
  },
  verticalInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  // Shared styles
  dateText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  activeText: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '500',
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
    fontSize: 10,
    fontWeight: '400',
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

export default EventCard;