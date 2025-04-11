import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  Image,
  FlatList,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { createEventApi } from '../apis/events';
import { useAuth } from '../store/context/authContext';


const CreateEventScreen = ({ navigation }) => {
  const token = useAuth().token;
  // Form state variables matching the API requirements


  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [ageRestriction, setAgeRestriction] = useState('');
  const [dressCode, setDressCode] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [description, setDescription] = useState('');
  const [eventPhotos, setEventPhotos] = useState([]); // For displaying images
  const [eventPhotosData, setEventPhotosData] = useState([])
  const [rules, setRules] = useState([]);
  const [influencerRequirements, setInfluencerRequirements] = useState([]);
  const [newRule, setNewRule] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [offerType, setOfferType] = useState('stayUntilClosed');
  const [location, setLocation] = useState('');
  const [locationData, setLocationData] = useState({
    coordinates: [0, 0], // [longitude, latitude]
    address: ''
  });
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [locationPermission, setLocationPermission] = useState(null);

  const MAX_PHOTOS = 3; // Maximum number of photos that can be uploaded

  const addRule = () => {
    if (newRule.trim() !== '') {
      setRules([...rules, newRule.trim()]);
      setNewRule('');
    }
  };

  const removeRule = (index) => {
    const updatedRules = [...rules];
    updatedRules.splice(index, 1);
    setRules(updatedRules);
  };

  const addRequirement = () => {
    if (newRequirement.trim() !== '') {
      setInfluencerRequirements([...influencerRequirements, newRequirement.trim()]);
      setNewRequirement('');
    }
  };

  const removeRequirement = (index) => {
    const updatedRequirements = [...influencerRequirements];
    updatedRequirements.splice(index, 1);
    setInfluencerRequirements(updatedRequirements);
  };

  const pickImage = async () => {
    // Check if we've reached the maximum number of photos
    if (eventPhotos.length >= MAX_PHOTOS) {
      Alert.alert('Limit Reached', `You can only upload a maximum of ${MAX_PHOTOS} photos.`);
      return;
    }

    // Request media library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to upload photos');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];

      // Create the file data object for the API
      const fileData = {
        uri: selectedImage.uri,
        name: selectedImage.uri.split('/').pop(),
        type: selectedImage.uri.match(/\.(\w+)$/)
          ? `image/${selectedImage.uri.match(/\.(\w+)$/)[1]}`
          : 'image/jpeg'
      };

      // Add to eventPhotos array for display
      setEventPhotos(prevPhotos => [...prevPhotos, selectedImage.uri]);

      // Add to eventPhotosData array for API submission
      setEventPhotosData(prevData => [...prevData, fileData]);
    }
  };

  const removePhoto = (index) => {
    const updatedPhotos = [...eventPhotos];
    updatedPhotos.splice(index, 1);
    setEventPhotos(updatedPhotos);

    const updatedPhotosData = [...eventPhotosData];
    updatedPhotosData.splice(index, 1);
    setEventPhotosData(updatedPhotosData);
  };

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setLocationPermission(status);

    if (status === 'granted') {
      getCurrentLocation();
    } else {
      Alert.alert('Permission denied', 'Location permission is required to select a venue location.');
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });

      const { latitude, longitude } = location.coords;

      // Update map region
      setMapRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      // Reverse geocode to get address
      const addressResponse = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      if (addressResponse && addressResponse.length > 0) {
        const address = addressResponse[0];
        const formattedAddress = `${address.name || ''} ${address.street || ''}, ${address.city || ''}, ${address.region || ''}, ${address.country || ''}`.trim();

        // Set location data in the format your API expects
        setLocationData({
          coordinates: [longitude, latitude], // Note: GeoJSON format uses [longitude, latitude]
          address: formattedAddress
        });

        // Also update the display value for the input field
        setLocation(formattedAddress);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Failed to get your current location.');
    }
  };

  const handleMapPress = async (event) => {
    const { coordinate } = event.nativeEvent;
    const { latitude, longitude } = coordinate;

    // Update marker position
    setMapRegion({
      ...mapRegion,
      latitude,
      longitude
    });

    // Reverse geocode to get address
    const addressResponse = await Location.reverseGeocodeAsync({
      latitude,
      longitude
    });

    if (addressResponse && addressResponse.length > 0) {
      const address = addressResponse[0];
      const formattedAddress = `${address.name || ''} ${address.street || ''}, ${address.city || ''}, ${address.region || ''}, ${address.country || ''}`.trim();

      // Set location data in the format your API expects
      setLocationData({
        coordinates: [longitude, latitude], // GeoJSON format: [longitude, latitude]
        address: formattedAddress
      });

      // Update the location display
      setLocation(formattedAddress);
    }
  };

  const prepareEventsFormData = () => {
    // Create a new FormData instance for professional photos
    const photosFormData = new FormData();

    // Add professional photos that are not null
    eventPhotosData.forEach((photo, index) => {
      if (photo) {
        photosFormData.append(`files`, photo);
      }
    });
    return photosFormData;
  };

  const handleSubmit = async () => {
    try {
      const data = {
        title,
        date,
        startTime,
        endTime,
        ageRestriction,
        dressCode,
        rules,
        location: locationData,
        instagramHandle,
        description,
        eventPhotos: eventPhotosData.filter(photo => photo !== null).map(photo => photo.name),
        influencerRequirements,
      };

      const eventsFormData = prepareEventsFormData();
      await createEventApi(token, data, eventsFormData);

      // Show success message
      Alert.alert('Success', 'Your event has been created successfully!');

      setTitle('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setAgeRestriction('');
      setDressCode('');
      setInstagramHandle('');
      setDescription('');
      setEventPhotos([]); // For displaying images
      setEventPhotosData([])
      setRules([]);
      setInfluencerRequirements([]);
      setNewRule('');
      setNewRequirement('');
      // setOfferType('stayUntilClosed');
      setLocation('');
      setLocationData({
        coordinates: [0, 0],
        address: ''
      });

      // Navigate back or to another screen
      navigation.goBack();
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'Failed to create event. Please try again.');
    }
  };

  const renderPhotoItem = ({ item, index }) => (
    <View style={styles.photoItem}>
      <Image source={{ uri: item }} style={styles.photoThumbnail} />
      <TouchableOpacity
        style={styles.removePhotoButton}
        onPress={() => removePhoto(index)}
      >
        <Ionicons name="close-circle" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
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
          {/* Event Photos Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Event Photos ({eventPhotos.length}/{MAX_PHOTOS})</Text>

            <View style={styles.photosContainer}>
              {eventPhotos.length > 0 && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.photosList}
                >
                  {eventPhotos.map((photo, index) => (
                    <View key={`photo-${index}`} style={styles.photoItem}>
                      <Image source={{ uri: photo }} style={styles.photoThumbnail} />
                      <TouchableOpacity
                        style={styles.removePhotoButton}
                        onPress={() => removePhoto(index)}
                      >
                        <Ionicons name="close-circle" size={24} color={colors.textPrimary} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              )}

              {eventPhotos.length < MAX_PHOTOS && (
                <TouchableOpacity
                  style={styles.addPhotoButton}
                  onPress={pickImage}
                >
                  <Ionicons name="add" size={36} color={colors.textPrimary} />
                  <Text style={styles.addPhotoText}>Add photo</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Event Details Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Event Details</Text>

            <TextInput
              style={styles.input}
              placeholder="Event name"
              placeholderTextColor="#9E9E9E"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={styles.input}
              placeholder="Event date (DD/MM/YYYY)"
              placeholderTextColor="#9E9E9E"
              value={date}
              onChangeText={setDate}
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

            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, styles.inputWithIcon]}
                placeholder="Dress code"
                placeholderTextColor="#9E9E9E"
                value={dressCode}
                onChangeText={setDressCode}
              />
              <View style={styles.iconContainer}>
                <Ionicons name="shirt-outline" size={18} color={colors.textSecondary} />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, styles.inputWithIcon]}
                placeholder="Age restriction"
                placeholderTextColor="#9E9E9E"
                value={ageRestriction}
                onChangeText={setAgeRestriction}
                keyboardType="number-pad"
              />
              <View style={styles.iconContainer}>
                <Ionicons name="person-outline" size={18} color={colors.textSecondary} />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, styles.inputWithIcon]}
                placeholder="Instagram handle"
                placeholderTextColor="#9E9E9E"
                value={instagramHandle}
                onChangeText={setInstagramHandle}
              />
              <View style={styles.iconContainer}>
                <Ionicons name="at-outline" size={18} color={colors.textSecondary} />
              </View>
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

            {/* Existing radio button rules (preserved) */}
            <View style={styles.radioOption}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => {
                  const socialMediaRule = "3 posts, 4 stories on social media";
                  if (!rules.includes(socialMediaRule)) {
                    setRules([...rules, socialMediaRule]);
                  } else {
                    setRules(rules.filter(rule => rule !== socialMediaRule));
                  }
                }}
              >
                <View style={[styles.radioCircle, rules.includes("3 posts, 4 stories on social media") && styles.radioCircleSelected]}>
                  {rules.includes("3 posts, 4 stories on social media") && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
              <Text style={styles.radioText}>3 posts, 4 stories on social media</Text>
            </View>

            <View style={styles.radioOption}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => {
                  const googleReviewRule = "Google reviews";
                  if (!rules.includes(googleReviewRule)) {
                    setRules([...rules, googleReviewRule]);
                  } else {
                    setRules(rules.filter(rule => rule !== googleReviewRule));
                  }
                }}
              >
                <View style={[styles.radioCircle, rules.includes("Google reviews") && styles.radioCircleSelected]}>
                  {rules.includes("Google reviews") && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
              <Text style={styles.radioText}>Google reviews</Text>
            </View>

            {/* Custom rules list */}
            {rules.map((rule, index) => {
              // Skip the predefined rules as they are already shown above
              if (rule === "3 posts, 4 stories on social media" || rule === "Google reviews") {
                return null;
              }

              return (
                <View key={`rule-${index}`} style={styles.listItem}>
                  <Text style={styles.listItemText}>{rule}</Text>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeRule(index)}
                  >
                    <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
                  </TouchableOpacity>
                </View>
              );
            })}

            {/* Add new rule input */}
            <View style={styles.addItemContainer}>
              <TextInput
                style={styles.addItemInput}
                placeholder="Add new rule..."
                placeholderTextColor="#9E9E9E"
                value={newRule}
                onChangeText={setNewRule}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={addRule}
              >
                <Ionicons name="add-circle" size={24} color={colors.accent} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Influencer Requirements Section - New Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Influencer Requirements</Text>

            {/* List of added requirements */}
            {influencerRequirements.map((requirement, index) => (
              <View key={`req-${index}`} style={styles.listItem}>
                <Text style={styles.listItemText}>{requirement}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeRequirement(index)}
                >
                  <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            ))}

            {/* Add new requirement input */}
            <View style={styles.addItemContainer}>
              <TextInput
                style={styles.addItemInput}
                placeholder="Add new requirement..."
                placeholderTextColor="#9E9E9E"
                value={newRequirement}
                onChangeText={setNewRequirement}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={addRequirement}
              >
                <Ionicons name="add-circle" size={24} color={colors.accent} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Offer Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Offer to applicants</Text>

            <View style={styles.radioOption}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setOfferType('stayUntilClosed')}
              >
                <View style={[styles.radioCircle, offerType === 'stayUntilClosed' && styles.radioCircleSelected]}>
                  {offerType === 'stayUntilClosed' && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
              <Text style={styles.radioText}>Stay until closed</Text>
            </View>

            <View style={styles.radioOption}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setOfferType('foodAndDrinks')}
              >
                <View style={[styles.radioCircle, offerType === 'foodAndDrinks' && styles.radioCircleSelected]}>
                  {offerType === 'foodAndDrinks' && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
              <Text style={styles.radioText}>Table with drinks & food</Text>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, styles.inputWithIcon]}
                placeholder="Location"
                placeholderTextColor="#9E9E9E"
                value={location}
                onChangeText={setLocation}
                onFocus={requestLocationPermission}
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={requestLocationPermission}
              >
                <Ionicons name="location-outline" size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Map Placeholder - You could integrate actual maps here */}
          <View style={styles.mapContainer}>
            {locationPermission === 'granted' ? (
              <MapView
                style={styles.map}
                region={mapRegion}
                onPress={handleMapPress}
              >
                <Marker
                  coordinate={{
                    latitude: mapRegion.latitude,
                    longitude: mapRegion.longitude
                  }}
                />
              </MapView>
            ) : (
              <TouchableOpacity
                style={styles.mapPlaceholder}
                onPress={requestLocationPermission}
              >
                <Ionicons name="map-outline" size={36} color={colors.textSecondary} />
                <Text style={styles.mapPlaceholderText}>Tap to enable map</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Create Event Button */}
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleSubmit}
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
  photosContainer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  photosList: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  photoItem: {
    position: 'relative',
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  photoThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removePhotoButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
  },
  addPhotoButton: {
    height: 100,
    width: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderStyle: 'dashed',
  },
  addPhotoText: {
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
    height: 45, // Fixed height for all inputs
  },
  inputWithIcon: {
    paddingRight: 40, // Make room for the icon
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 0,
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  placeholderText: {
    color: '#9E9E9E',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10, // Add gap between time inputs
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
  map: {
    width: '100%',
    height: '100%',
  },
  // New styles for the custom lists
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  listItemText: {
    color: colors.textPrimary,
    flex: 1,
  },
  removeButton: {
    padding: 4,
  },
  addItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  addItemInput: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 10,
    height: 45,
  },
  addButton: {
    padding: 5,
  },
});

export default CreateEventScreen;