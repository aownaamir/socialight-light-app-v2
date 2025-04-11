import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../store/context/authContext';
import Constants from 'expo-constants';
import ApplicationItem from '../components/ApplicationItem';
import { getEventApplicationsApi } from '../apis/application';

const VenueApplicationsScreen = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);

    const { eventId, eventName } = route.params || {};
    const token = useAuth().token;

    // Fetch applications for the specific event when component mounts
    useEffect(() => {
        fetchApplicationsApi();
    }, [token, eventId]);

    async function fetchApplicationsApi() {
        setLoading(true);
        try {
            const result = await getEventApplicationsApi(token, eventId);
            setApplications(result);
            setError(null);
        } catch (err) {
            setError('Failed to load applications. Please try again.');
            console.error('Error fetching applications:', err);
            Alert.alert('Error', 'Failed to load applications. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const handleAccept = (applicationId) => {
        // This function is still needed to update the parent state
        // But the API call is now handled in the ApplicationItem component
        setApplications(apps =>
            apps.map(app => app.id === applicationId ? { ...app, status: 'accepted' } : app)
        );
    };

    const handleReject = (applicationId) => {
        // This function is still needed to update the parent state
        // But the API call is now handled in the ApplicationItem component
        setApplications(apps =>
            apps.map(app => app.id === applicationId ? { ...app, status: 'rejected' } : app)
        );
    };

    const handleViewProfile = (influencerId) => {
        navigation.navigate('ProfileInfluencerProfile', { influencerId });
    };

    return (
        <LinearGradient
            colors={[colors.background, colors.mapOverlay]}
            style={styles.container}
        >
            <StatusBar style="light" />
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                {/* <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Applications for {eventName}</Text>
                    <View style={{ width: 24 }} />
                </View> */}

                {/* Event Name Banner */}
                <View style={styles.eventBanner}>
                    <Text style={styles.eventName}>{eventName}</Text>
                </View>

                {/* Applications List */}
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.accent} />
                    </View>
                ) : applications.length > 0 ? (
                    <FlatList
                        data={applications}
                        renderItem={({ item }) => (
                            <ApplicationItem
                                item={item}
                                token={token}
                                onAccept={handleAccept}
                                onReject={handleReject}
                                onViewProfile={handleViewProfile}
                            />
                        )}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.applicationsList}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <View style={styles.emptyStateContainer}>
                        <Ionicons name="alert-circle-outline" size={60} color={colors.textSecondary} />
                        <Text style={styles.emptyStateText}>No applications for this event</Text>
                    </View>
                )}
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
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    headerTitle: {
        color: colors.textPrimary,
        fontSize: 18,
        fontWeight: '600',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eventBanner: {
        paddingTop: 10,
        paddingBottom: 25,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    eventName: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    applicationsList: {
        padding: 15,
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyStateText: {
        color: colors.textSecondary,
        fontSize: 16,
        marginTop: 15,
        textAlign: 'center',
    },
});

export default VenueApplicationsScreen;