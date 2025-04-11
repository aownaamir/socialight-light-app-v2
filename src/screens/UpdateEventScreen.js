import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
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
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { updateEventApi } from '../apis/events';
import { useAuth } from '../store/context/authContext';
import { colors } from '../theme';
import apiURL from '../apis/apiURL';

const UpdateEventScreen = ({ navigation, route }) => {
    const { event } = route.params;
    const token = useAuth().token;

    // Initialize state with properly accessed properties from the event object
    const [title, setTitle] = useState(event?.title || '');
    const [date, setDate] = useState(event?.date || '');
    const [startTime, setStartTime] = useState(event?.start_time || '');
    const [endTime, setEndTime] = useState(event?.end_time || '');
    const [ageRestriction, setAgeRestriction] = useState(event.age_restriction.toString() || '');
    const [dressCode, setDressCode] = useState(event?.dress_code || '');
    const [instagramHandle, setInstagramHandle] = useState(event?.insta_handle || '');
    const [description, setDescription] = useState(event?.description || '');
    const [status, setStatus] = useState(event?.status || '');

    // Handle event photos properly
    const [eventPhotos, setEventPhotos] = useState(event.event_photos);

    // Ensure rules and requirements are arrays
    const [rules, setRules] = useState(Array.isArray(event?.rules) ? event.rules : []);
    const [influencerRequirements, setInfluencerRequirements] = useState(
        Array.isArray(event?.influencer_requirements) ? event.influencer_requirements : []
    );

    const [newRule, setNewRule] = useState('');
    const [newRequirement, setNewRequirement] = useState('');

    // Handle offer type properly
    const [offerType, setOfferType] = useState(event?.offer_type || 'stayUntilClosed');

    // Handle location properly depending on if it's a string or object
    const [location, setLocation] = useState(() => {
        if (!event?.location) return '';
        return event.location;
    });

    // Handle location data properly
    const [locationData, setLocationData] = useState({
        coordinates:
            event?.location?.coordinates ?
                event.location.coordinates :
                [0, 0],
        address:
            event?.location?.address ?
                event.location.address :
                (typeof event?.location === 'string' ? event.location : '')
    });

    // Set map region based on location coordinates if available
    const [mapRegion, setMapRegion] = useState(() => {
        if (event?.location?.coordinates && Array.isArray(event.location.coordinates) && event.location.coordinates.length === 2) {
            return {
                latitude: event.location.coordinates[1], // GeoJSON format is [longitude, latitude]
                longitude: event.location.coordinates[0],
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };
        }
        return {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
    });

    const [locationPermission, setLocationPermission] = useState(null);

    // Check for location permission on mount
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            setLocationPermission(status);
        })();
    }, []);

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

    const pickImage = async (index) => {
        // Request media library permissions
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please grant camera roll permissions to upload photos');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedImage = result.assets[0];

            // Update the photo at the specified index, or add a new one
            const updatedPhotos = [...eventPhotos];
            if (index !== undefined && index < updatedPhotos.length) {
                // Replace existing photo
                updatedPhotos[index] = {
                    uri: selectedImage.uri,
                    isExisting: false,
                    fileName: selectedImage.uri.split('/').pop()
                };
            } else {
                // Add new photo
                updatedPhotos.push({
                    uri: selectedImage.uri,
                    name: selectedImage.uri.split('/').pop(),
                    type: selectedImage.uri.match(/\.(\w+)$/)
                        ? `image/${selectedImage.uri.match(/\.(\w+)$/)[1]}`
                        : 'image/jpeg'
                });
            }

            setEventPhotos(updatedPhotos);
        }
    };

    const removePhoto = (index) => {
        const updatedPhotos = [...eventPhotos];
        updatedPhotos.splice(index, 1);
        setEventPhotos(updatedPhotos);
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
                setLocation({
                    coordinates: [longitude, latitude],
                    address: formattedAddress
                });
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

            // Update location consistently as an object
            setLocation({
                coordinates: [longitude, latitude],
                address: formattedAddress
            });
        }
    };

    const handleSubmit = async () => {
        try {
            // Prepare updated data
            const updatedData = {
                title,
                dressCode,
                rules,
                location,
                instagramHandle,
                description,
                eventPhotos: eventPhotos.map(photo => photo.name),
                influencerRequirements,
                status,
            };


            // Handle image uploads if there are new images
            const formData = new FormData();
            if (eventPhotos.length > 0) {

                // Create an array to track which photos are new and need to be sent
                // const newPhotos = eventPhotos.filter(photo => !photo.isExisting);

                // Only append new photos (ones that aren't from existing event photos)
                eventPhotos.forEach((photo) =>
                    formData.append('files', photo)
                );

                // Only include formData if there are new photos to upload
                // if (formData.getParts().length > 0) {
                //     updatedData.eventPhotos = formData;
                // }

                // Also include the list of all photo URIs (including existing ones)
                // updatedData.eventPhotoUris = eventPhotos.map(photo => photo.uri);
            }

            // // Call update API with event ID, updated data, and token
            await updateEventApi(token, event._id, updatedData, formData);
            console.log('formData', formData)
            // Show success message
            Alert.alert('Success', 'Your event has been updated successfully!');

            // Navigate back
            navigation.goBack();
        } catch (error) {
            console.error('Error updating event:', error);
            Alert.alert('Error', 'Failed to update event. Please try again.');
        }
    };

    // Helper function to properly display location
    const getLocationDisplayText = () => {
        if (!location) return '';
        if (typeof location === 'string') return location;
        if (location.address) return location.address;
        if (location.coordinates && location.coordinates.length === 2) {
            return `${location.coordinates[1]}, ${location.coordinates[0]}`;
        }
        return '';
    };

    // Render photo item
    const renderPhotoItem = ({ item, index }) => (
        <View style={styles.photoItemContainer}>
            <TouchableOpacity
                style={styles.photoItem}
                onPress={() => pickImage(index)}
            >
                {item.uri ? (
                    <>
                        <Image
                            source={{ uri: item.uri }}
                            style={styles.photoImage}
                            resizeMode="cover"
                        />
                        <TouchableOpacity
                            style={styles.removePhotoButton}
                            onPress={() => removePhoto(index)}
                        >
                            <Ionicons name="close-circle" size={22} color={colors.textPrimary} />
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Ionicons name="add" size={28} color={colors.textPrimary} />
                        <Text style={styles.addPhotoText}>Upload photo</Text>
                    </>
                )}
            </TouchableOpacity>
        </View>
    );

    // Add empty slot function for photo upload
    const renderEmptyPhotoSlot = () => {
        if (eventPhotos.length >= 3) return null;

        return (
            <TouchableOpacity
                style={[styles.photoItem, styles.emptyPhotoSlot]}
                onPress={() => pickImage()}
            >
                <Ionicons name="add" size={28} color={colors.textPrimary} />
                <Text style={styles.addPhotoText}>Upload photo</Text>
            </TouchableOpacity>
        );
    };

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
                    {/* Header with back button */}
                    {/* <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Update Event</Text>
                        <View style={{ width: 24 }} /> {/* Empty view for spacing                             
                    </View> */}

                    {/* Event Photos Section */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Event Photos</Text>
                        <View style={styles.photosContainer}>
                            {eventPhotos.map((photo, index) => (
                                <View key={`photo-${index}`} style={styles.photoItemContainer}>
                                    <TouchableOpacity
                                        style={styles.photoItem}
                                        onPress={() => pickImage(index)}
                                    >
                                        <Image
                                            source={{ uri: `${apiURL}/uploads/${photo}` }}
                                            style={styles.photoImage}
                                            resizeMode="cover"
                                        />
                                        <TouchableOpacity
                                            style={styles.removePhotoButton}
                                            onPress={() => removePhoto(index)}
                                        >
                                            <Ionicons name="close-circle" size={22} color={colors.textPrimary} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </View>
                            ))}

                            {/* Add empty slots until we have 3 total items */}
                            {Array.from({ length: Math.max(0, 3 - eventPhotos.length) }).map((_, index) => (
                                <View key={`empty-${index}`} style={styles.photoItemContainer}>
                                    <TouchableOpacity
                                        style={styles.photoItem}
                                        onPress={() => pickImage()}
                                    >
                                        <Ionicons name="add" size={28} color={colors.textPrimary} />
                                        <Text style={styles.addPhotoText}>Upload photo</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
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

                        {/* Existing radio button rules */}
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

                    {/* Influencer Requirements Section */}
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
                                value={getLocationDisplayText()}
                                onChangeText={(text) => {
                                    if (typeof location === 'object') {
                                        setLocation({ ...location, address: text });
                                    } else {
                                        setLocation(text);
                                    }
                                }}
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

                    {/* Map */}
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

                    {/* Update Event Button */}
                    <TouchableOpacity
                        style={styles.updateButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.updateButtonText}>Update event</Text>
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
    // New Event Photos Section
    photosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    photoItemContainer: {
        width: '32%',
        marginBottom: 8,
    },
    photoItem: {
        height: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    photoImage: {
        width: '100%',
        height: '100%',
    },
    addPhotoText: {
        color: colors.textPrimary,
        marginTop: 8,
        fontSize: 12,
    },
    removePhotoButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 12,
        padding: 2,
    },
    emptyPhotoSlot: {
        borderStyle: 'dashed',
    },
    // Rest of the styles
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
    updateButton: {
        backgroundColor: colors.accent,
        borderRadius: 25,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 20,
    },
    updateButtonText: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: '600',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    // Styles for the custom lists
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

export default UpdateEventScreen;