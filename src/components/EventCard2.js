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
import { BlurView } from 'expo-blur'; // You'll need to install this package
import { colors } from '../theme/index';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const EventCard2 = ({ event, variant = 'horizontal' }) => {
  const navigation = useNavigation()

  const handleEventPress = (id) => {
    // Navigate to event details screen
    navigation.navigate('Details', { id: event.id });
  };

  // Horizontal card (used in HomeScreen)
  if (variant === 'horizontal') {
    return (
      <Pressable style={styles.horizontalCard} onPress={() => handleEventPress(event.id)}>
        <ImageBackground
          source={event.coverImage || event.image}
          style={styles.horizontalImage}
          imageStyle={styles.horizontalImageStyle}
        >
          {/* Bottom info container with blur effect */}
          <View style={styles.bottomInfoContainer}>
            <BlurView intensity={120} tint="systemThinMaterialLight" style={styles.blurContainer} experimentalBlurMethod="blur" >
              <LinearGradient
                colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']}
                style={styles.infoGradient}
              >
                <Text style={styles.eventName}>{event.title}</Text>
                
                <View style={styles.eventDetailsRow}>
                  <View style={styles.statusContainer}>
                    {event.status === 'Active' && (
                      <>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>{event.status}</Text>
                      </>
                    )}
                    
                    {event.date && (
                      <Text style={styles.dateText}>
                        {event.date.includes('at') ? event.date.split(' at')[0] : event.date}
                      </Text>
                    )}
                  </View>
                  
                  {event.location && (
                    <View style={styles.locationContainer}>
                      <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                      <Text style={styles.locationText}>{event.location}</Text>
                    </View>
                  )}
                </View>
              </LinearGradient>
            </BlurView>
          </View>
          
          <Pressable style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={24} color="white" />
          </Pressable>
        </ImageBackground>
      </Pressable>
    );
  }

  // Vertical card (used in EventsScreen) 
  return (
    <Pressable 
      style={styles.verticalCard}
      onPress={() => handleEventPress(event.id)}
    >
      <Image source={event.image} style={styles.verticalImage} />
      
      {/* Bottom info container with blur effect */}
      <View style={styles.bottomInfoContainer}>
        <BlurView intensity={120} tint="systemThinMaterialLight" style={styles.blurContainer} experimentalBlurMethod="blur" >
          <LinearGradient
            colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']}
            style={styles.infoGradient}
          >
            <Text style={styles.eventName}>{event.title}</Text>
            
            <View style={styles.eventDetailsRow}>
              <View style={styles.statusContainer}>
                {event.status === 'Active' && (
                  <>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>{event.status}</Text>
                  </>
                )}
                
                {event.date && (
                  <Text style={styles.dateText}>
                    {event.date}
                  </Text>
                )}
              </View>
              
              {event.location && (
                <View style={styles.locationContainer}>
                  <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                  <Text style={styles.locationText}>{event.location}</Text>
                </View>
              )}
            </View>
          </LinearGradient>
        </BlurView>
      </View>
      
      <Pressable style={styles.favoriteButton}>
        <Ionicons name="heart-outline" size={24} color="white" />
      </Pressable>
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
  },
  horizontalImageStyle: {
    borderRadius: 15,
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
  
  // Blur container for event info
  bottomInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  blurContainer: {
    overflow: 'hidden',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  infoGradient: {
    padding: 15,
  },
  
  // Event details styling
  eventName: {
    color: colors.textPrimary || '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 5,
  },
  eventDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    color: colors.textPrimary || '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 10,
  },
  dateText: {
    color: colors.textPrimary || '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: colors.textSecondary || '#CCCCCC',
    fontSize: 14,
    marginLeft: 3,
  },
  favoriteButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default EventCard2;