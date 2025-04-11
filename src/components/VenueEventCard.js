import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ImageBackground,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { colors } from '../theme/index';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../store/context/authContext';
import apiURL from '../apis/apiURL';

const { width } = Dimensions.get('window');

const VenueEventCard = ({ event, variant = 'horizontal' }) => {
    const navigation = useNavigation();
    const user = useAuth().user;
    const id = event._id;

    const handleDetailsPress = () => {

        navigation.navigate('ProfileTab', { screen: 'ProfileEventsDetails', params: { id } });

    };

    const handleApplicationsPress = () => {
        // Navigate to Applications screen with the specific event ID
        navigation.navigate('ProfileApplications', { eventId: id, eventName: event.title });
    };

    // Horizontal card (used in HomeScreen)
    if (variant === 'horizontal') {
        return (
            <View style={styles.horizontalCard}>
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

                        {/* Action buttons */}
                        <View style={styles.actionButtonsContainer}>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.applicationsButton]}
                                onPress={handleApplicationsPress}
                            >
                                <Ionicons name="people" size={14} color={colors.textPrimary} />
                                <Text style={styles.actionButtonText}>Applications</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.actionButton, styles.detailsButton]}
                                onPress={handleDetailsPress}
                            >
                                <Ionicons name="information-circle" size={14} color={colors.textPrimary} />
                                <Text style={styles.actionButtonText}>Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Pressable style={styles.favoriteButton}>
                        <Ionicons name="heart-outline" size={18} color={colors.textPrimary} />
                    </Pressable>
                </ImageBackground>
            </View>
        );
    }

    // Vertical card (used in EventsScreen) 
    return (
        <View style={styles.verticalCard}>
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

                        {/* Action buttons for vertical card */}
                        <View style={styles.verticalActionButtonsContainer}>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.applicationsButton]}
                                onPress={handleApplicationsPress}
                            >
                                <Ionicons name="people" size={14} color={colors.textPrimary} />
                                <Text style={styles.actionButtonText}>Applications</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.actionButton, styles.detailsButton]}
                                onPress={handleDetailsPress}
                            >
                                <Ionicons name="information-circle" size={14} color={colors.textPrimary} />
                                <Text style={styles.actionButtonText}>Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    // Horizontal card styles
    horizontalCard: {
        width: width * 0.8,
        height: 220, // Increased height to accommodate buttons
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
        height: 240, // Increased height to accommodate buttons
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
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },

    // Action buttons styles
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    verticalActionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 12,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
        marginRight: 8,
    },
    applicationsButton: {
        backgroundColor: 'rgba(5, 101, 98, 0.8)', // Using accent color with opacity
    },
    detailsButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    actionButtonText: {
        color: colors.textPrimary,
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 4,
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

export default VenueEventCard;