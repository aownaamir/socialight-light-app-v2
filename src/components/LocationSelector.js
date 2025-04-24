import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
    ActivityIndicator,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/index';

const LocationSelector = ({ location, setLocation, locationData, setLocationData, mapRegion, setMapRegion }) => {
    const [searchQuery, setSearchQuery] = useState(location?.address || '');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResultsModal, setShowResultsModal] = useState(false);
    const mapRef = useRef(null);

    useEffect(() => {
        setLocationData({
            coordinates: locationData.coordinates,
            address: locationData.address
        })

    }, [])

    // Enhanced search function that tries to get better place names
    const searchLocations = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            setShowResultsModal(false);
            return;
        }

        setIsLoading(true);
        try {
            // Try to get better results with more context if searching for a landmark
            const searchQueries = [
                query, // Original query
                `${query} landmark`, // Try to find it as a landmark
                `${query} university`, // Universities often have better naming
                `${query} place` // Generic place search
            ];

            // Try all queries and use the first one that returns results
            let bestResults = [];

            for (const searchText of searchQueries) {
                const results = await Location.geocodeAsync(searchText);
                if (results && results.length > 0) {
                    // For each geocoded result, get the address
                    const detailedResults = await Promise.all(
                        results.slice(0, 5).map(async (result) => {
                            const { latitude, longitude } = result;
                            try {
                                // Get detailed address
                                const addressResponse = await Location.reverseGeocodeAsync({
                                    latitude,
                                    longitude
                                }, { useGoogleMaps: true });

                                if (addressResponse && addressResponse.length > 0) {
                                    const address = addressResponse[0];

                                    // Try to construct a meaningful name
                                    let placeName = address.name || '';

                                    // If we have a name that seems to be descriptive (not just coordinates)
                                    const isPlaceName = placeName &&
                                        !placeName.includes('+') &&
                                        placeName.length > 3;

                                    // More readable formatted address
                                    const formattedAddress = [
                                        isPlaceName ? placeName : '',
                                        address.street || '',
                                        address.city || '',
                                        address.region || '',
                                        address.country || ''
                                    ].filter(Boolean).join(', ');

                                    return {
                                        coordinates: { latitude, longitude },
                                        address: formattedAddress,
                                        name: isPlaceName ? placeName : null,
                                        // Add a score for better sorting - locations with names should rank higher
                                        score: isPlaceName ? 10 : 0
                                    };
                                }
                            } catch (error) {
                                console.error('Error in reverse geocoding:', error);
                            }
                            return null;
                        })
                    );

                    // Filter out null results
                    const validResults = detailedResults.filter(item => item !== null);

                    if (validResults.length > 0) {
                        // Sort by score (locations with proper names first)
                        validResults.sort((a, b) => b.score - a.score);
                        bestResults = validResults;
                        break; // Use this set of results
                    }
                }
            }

            // Remove duplicates based on address
            const uniqueResults = bestResults.filter((item, index, self) =>
                index === self.findIndex((t) => t.address === item.address)
            );

            setSearchResults(uniqueResults);
            if (uniqueResults.length > 0) {
                setShowResultsModal(true);
            }
        } catch (error) {
            console.error('Error searching for locations:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Debounce implementation for search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery.trim()) {
                searchLocations(searchQuery);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Select a location from the search results
    const selectLocation = (item) => {
        console.log('Selected location:', item);
        // setLocation(item.address);
        setLocation({
            coordinates: [item.coordinates.longitude, item.coordinates.latitude],
            address: item.address
        });

        setLocationData({
            coordinates: [item.coordinates.longitude, item.coordinates.latitude],
            address: item.address
        });

        const newRegion = {
            latitude: item.coordinates.latitude,
            longitude: item.coordinates.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
        };

        setMapRegion(newRegion);

        // Animate map to the selected location
        mapRef.current?.animateToRegion(newRegion, 1000);

        // Hide the results modal
        setShowResultsModal(false);
    };

    // Handle map press to select location
    const handleMapPress = async (event) => {
        const { coordinate } = event.nativeEvent;
        const { latitude, longitude } = coordinate;

        setMapRegion({
            ...mapRegion,
            latitude,
            longitude
        });

        try {
            const addressResponse = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            }, { useGoogleMaps: true });

            if (addressResponse && addressResponse.length > 0) {
                const address = addressResponse[0];

                // Try to construct a more meaningful address
                let placeName = address.name || '';
                const isPlaceName = placeName && !placeName.includes('+') && placeName.length > 3;

                const formattedAddress = [
                    isPlaceName ? placeName : '',
                    address.street || '',
                    address.city || '',
                    address.region || '',
                    address.country || ''
                ].filter(Boolean).join(', ');

                setLocationData({
                    coordinates: [longitude, latitude],
                    address: formattedAddress
                });

                setLocation(formattedAddress);
                setSearchQuery(formattedAddress);
            }
        } catch (error) {
            console.error('Error getting address for location:', error);
        }
    };

    // Render search results in a modal to avoid nesting issues
    const renderSearchResultsModal = () => {
        return (
            <Modal
                transparent={true}
                visible={showResultsModal}
                animationType="fade"
                onRequestClose={() => setShowResultsModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowResultsModal(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Select Location</Text>
                                {searchResults.map((item, index) => (
                                    <TouchableOpacity
                                        key={`location-${index}`}
                                        style={styles.resultItem}
                                        onPress={() => selectLocation(item)}
                                    >
                                        <Ionicons name="location-outline" size={16} color={colors.textSecondary} style={styles.resultIcon} />
                                        <Text style={styles.resultText} numberOfLines={2}>{item.address}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Event Location</Text>

            <View style={styles.searchContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={[styles.input, styles.inputWithIcon]}
                        placeholder="Search for a location"
                        placeholderTextColor="#9E9E9E"
                        value={searchQuery}
                        onChangeText={(text) => {
                            setSearchQuery(text);
                            if (text.trim() === '') {
                                setShowResultsModal(false);
                            }
                        }}
                        onFocus={() => {
                            if (searchResults.length > 0) {
                                setShowResultsModal(true);
                            }
                        }}
                    />

                    {isLoading ? (
                        <View style={styles.iconContainer}>
                            <ActivityIndicator size="small" color={colors.textSecondary} />
                        </View>
                    ) : (
                        <View style={styles.iconButtons}>
                            {searchQuery ? (
                                <Pressable
                                    style={styles.iconButton}
                                    onPress={() => {
                                        setSearchQuery('');
                                        setSearchResults([]);
                                        setShowResultsModal(false);
                                    }}
                                >
                                    <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
                                </Pressable>
                            ) : null}
                        </View>
                    )}
                </View>
            </View>

            {/* Interactive Map */}
            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    region={mapRegion}
                    onPress={handleMapPress}
                >
                    <Marker
                        coordinate={{
                            latitude: mapRegion.latitude,
                            longitude: mapRegion.longitude
                        }}
                        draggable
                        onDragEnd={(e) => handleMapPress({ nativeEvent: { coordinate: e.nativeEvent.coordinate } })}
                    />
                </MapView>

                <View style={styles.mapOverlayContainer}>
                    <Text style={styles.mapInstructions}>
                        Tap or drag marker to set precise location
                    </Text>
                </View>
            </View>

            {/* Render the modal for search results */}
            {renderSearchResultsModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 12,
    },
    searchContainer: {
        position: 'relative',
        zIndex: 10,
    },
    inputWrapper: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 20,
        paddingRight: 80,
        color: colors.textPrimary,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        height: 45,
    },
    inputWithIcon: {
        paddingRight: 50,
    },
    iconContainer: {
        position: 'absolute',
        right: 20,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconButtons: {
        position: 'absolute',
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 5,
        marginLeft: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        width: '100%',
        backgroundColor: colors.background,
        borderRadius: 12,
        padding: 15,
        maxHeight: '60%',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.textPrimary,
        marginBottom: 10,
        textAlign: 'center',
    },
    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    resultIcon: {
        marginRight: 10,
    },
    resultText: {
        color: colors.textPrimary,
        flex: 1,
    },
    mapContainer: {
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 15,
        position: 'relative',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    mapOverlayContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    mapInstructions: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: colors.textPrimary,
        fontSize: 12,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
});

export default LocationSelector;