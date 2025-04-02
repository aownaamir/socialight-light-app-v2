import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';

const CreateEventScreen = ({ navigation }) => {
  const [eventRules, setEventRules] = useState({
    socialMedia: true,
    googleReviews: false
  });
  const [offerType, setOfferType] = useState('paid');
  
  // Simple state variables for form fields
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventSeats, setEventSeats] = useState('');
  const [ageLimit, setAgeLimit] = useState('');
  const [mention, setMention] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

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
          {/* <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create a event</Text>
            <TouchableOpacity style={styles.helpButton}>
              <Ionicons name="help-circle-outline" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View> */}

          {/* Cover Photo Area */}
          <TouchableOpacity 
            style={styles.coverPhotoContainer}
            onPress={() => Alert.alert("Upload Photo", "This will open your camera roll")}
          >
            <Ionicons name="add" size={36} color={colors.textPrimary} />
            <Text style={styles.coverPhotoText}>Add cover photo</Text>
          </TouchableOpacity>

          {/* Event Details Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Event Details</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Event name"
              placeholderTextColor="#9E9E9E"
              value={eventName}
              onChangeText={setEventName}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Event date (DD/MM/YYYY)"
              placeholderTextColor="#9E9E9E"
              value={eventDate}
              onChangeText={setEventDate}
              keyboardType="numbers-and-punctuation"
            />
            
            <View style={styles.timeContainer}>
              <TextInput 
                style={[styles.input, styles.timeInput]}
                placeholder="Start time"
                placeholderTextColor="#9E9E9E"
                value={startTime}
                onChangeText={setStartTime}
              />
              
              <TextInput 
                style={[styles.input, styles.timeInput]}
                placeholder="End time"
                placeholderTextColor="#9E9E9E"
                value={endTime}
                onChangeText={setEndTime}
              />
            </View>
            
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.inputWithIconText}
                placeholder="Dress code"
                placeholderTextColor="#9E9E9E"
                value={eventSeats}
                onChangeText={setEventSeats}
                keyboardType="number-pad"
              />
              <Ionicons name="people-outline" size={20} color={colors.textSecondary} />
            </View>
            
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.inputWithIconText}
                placeholder="Age"
                placeholderTextColor="#9E9E9E"
                value={ageLimit}
                onChangeText={setAgeLimit}
                keyboardType="number-pad"
              />
              <Ionicons name="person-outline" size={20} color={colors.textSecondary} />
            </View>
            
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.inputWithIconText}
                placeholder="Mention"
                placeholderTextColor="#9E9E9E"
                value={mention}
                onChangeText={setMention}
              />
              <Ionicons name="at-outline" size={20} color={colors.textSecondary} />
            </View>
          </View>

          {/* Event Description Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Event Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Write text..."
              placeholderTextColor="#9E9E9E"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Event Rules Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Event Rules</Text>
            
            <View style={styles.radioOption}>
              <TouchableOpacity 
                style={styles.radioButton}
                onPress={() => setEventRules({...eventRules, socialMedia: !eventRules.socialMedia})}
              >
                <View style={[styles.radioCircle, eventRules.socialMedia && styles.radioCircleSelected]}>
                  {eventRules.socialMedia && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
              <Text style={styles.radioText}>3 posts, 4 stories on social media</Text>
            </View>
            
            <View style={styles.radioOption}>
              <TouchableOpacity 
                style={styles.radioButton}
                onPress={() => setEventRules({...eventRules, googleReviews: !eventRules.googleReviews})}
              >
                <View style={[styles.radioCircle, eventRules.googleReviews && styles.radioCircleSelected]}>
                  {eventRules.googleReviews && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
              <Text style={styles.radioText}>Google reviews</Text>
            </View>
          </View>

          {/* Offer Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Offer to applicants</Text>
            
            <View style={styles.radioOption}>
              <TouchableOpacity 
                style={styles.radioButton}
                onPress={() => setOfferType('paid')}
              >
                <View style={[styles.radioCircle, offerType === 'paid' && styles.radioCircleSelected]}>
                  {offerType === 'paid' && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
              <Text style={styles.radioText}>Stay until closed</Text>
            </View>
            
            <View style={styles.radioOption}>
              <TouchableOpacity 
                style={styles.radioButton}
                onPress={() => setOfferType('food')}
              >
                <View style={[styles.radioCircle, offerType === 'food' && styles.radioCircleSelected]}>
                  {offerType === 'food' && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
              <Text style={styles.radioText}>Table with drinks & food</Text>
            </View>
            
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.inputWithIconText}
                placeholder="Location"
                placeholderTextColor="#9E9E9E"
                value={location}
                onChangeText={setLocation}
              />
              <Ionicons name="location-outline" size={20} color={colors.textSecondary} />
            </View>
          </View>

          {/* Map Placeholder */}
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <Ionicons name="map-outline" size={36} color={colors.textSecondary} />
              <Text style={styles.mapPlaceholderText}>Map View</Text>
            </View>
          </View>

          {/* Create Event Button */}
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => Alert.alert("Event Created", "Your event has been created successfully!")}
          >
            <Text style={styles.createButtonText}>Create event</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  helpButton: {
    padding: 5,
  },
  coverPhotoContainer: {
    height: 150,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  coverPhotoText: {
    color: colors.textPrimary,
    marginTop: 8,
    fontSize: 14,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 10,
  },
  inputWithIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 10,
  },
  inputWithIconText: {
    flex: 1,
    color: colors.textPrimary,
    paddingRight: 10,
  },
  placeholderText: {
    color: '#9E9E9E',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInput: {
    width: '48%',
  },
  textArea: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    height: 100,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioButton: {
    marginRight: 10,
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: colors.accent,
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
  radioText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  mapContainer: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  mapPlaceholder: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    color: colors.textPrimary,
    marginTop: 8,
  },
  createButton: {
    backgroundColor: colors.accent,
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateEventScreen;