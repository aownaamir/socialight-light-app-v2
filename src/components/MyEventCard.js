import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { colors } from '../theme/index';
import { useNavigation } from '@react-navigation/native';

const MyEventCard = ({ event }) => {
  
  const navigation = useNavigation();

  const handleEventPress = (id) => {
    navigation.navigate('Details', { id: event.id });
  };

  return (
  <Pressable 
    style={styles.eventCard}
    onPress={handleEventPress}
  >
    <View style={styles.eventImageContainer}>
      <Image source={event.image} style={styles.eventImage} />
    </View>
    <View style={styles.eventInfo}>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <Text style={styles.eventDate}>Reminder for {event.date}</Text>
      {event.time && !event.timeAgo ? (
        <Text style={styles.eventTime}>{event.time}</Text>
      ) : (
        <Text style={styles.eventTimeAgo}>{event.timeAgo}</Text>
      )}
    </View>
    <View style={styles.notificationDot} />
  </Pressable>
);}

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    marginBottom: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  eventImageContainer: {
    marginRight: 12,
  },
  eventImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  eventDate: {
    color: colors.textTertiary,
    fontSize: 12,
  },
  eventTime: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  eventTimeAgo: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  notificationDot: {
    position: 'absolute',
    right: 14,
    top: '50%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5252',
    marginTop: -4,
  },
});

export default MyEventCard;