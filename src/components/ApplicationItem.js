import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/index';
import { updateApplicationStatusApi } from '../apis/application';

const ApplicationItem = ({
    item,
    onAccept,
    onReject,
    onViewProfile,
    token
}) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(item.status);

    const handleAccept = async () => {
        setIsUpdating(true);
        try {
            await updateApplicationStatusApi(token, item.id, 'accepted');
            setCurrentStatus('accepted');
            onAccept(item.id);
        } catch (error) {
            console.error('Error accepting application:', error);
            Alert.alert(
                "Update Failed",
                `Could not accept application. ${error.message || 'Please check your connection and try again.'}`
            );
        } finally {
            setIsUpdating(false);
        }
    };

    const handleReject = async () => {
        setIsUpdating(true);
        try {
            console.log("Rejecting application with ID:", item.id);
            await updateApplicationStatusApi(token, item.id, 'rejected');
            setCurrentStatus('rejected');
            onReject(item.id);
        } catch (error) {
            console.error('Error rejecting application:', error);
            Alert.alert(
                "Update Failed",
                `Could not reject application. ${error.message || 'Please check your connection and try again.'}`
            );
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <View style={styles.applicationCard}>
            <View style={styles.applicationHeader}>
                <View style={styles.influencerInfo}>
                    <View style={styles.avatarContainer}>
                        <Ionicons name="person" size={30} color={colors.textPrimary} />
                    </View>
                    <View style={styles.influencerTextInfo}>
                        <Text style={styles.influencerName}>{item.influencer.name}</Text>
                        <Text style={styles.influencerUsername}>{item.influencer.username}</Text>
                    </View>
                </View>
                <View style={styles.followersContainer}>
                    <Ionicons name="people" size={14} color={colors.textSecondary} />
                    <Text style={styles.followersText}>{item.influencer.followers}</Text>
                </View>
            </View>

            <View style={styles.applicationActions}>
                {isUpdating ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color={colors.accent} />
                        <Text style={styles.loadingText}>Updating status...</Text>
                    </View>
                ) : currentStatus === 'pending' ? (
                    <>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.acceptButton]}
                            onPress={handleAccept}
                        >
                            <Text style={styles.actionButtonText}>Accept</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, styles.rejectButton]}
                            onPress={handleReject}
                        >
                            <Text style={styles.actionButtonText}>Reject</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <View style={[
                        styles.statusBadge,
                        currentStatus === 'accepted' ? styles.acceptedBadge : styles.rejectedBadge
                    ]}>
                        <Text style={styles.statusText}>
                            {currentStatus === 'accepted' ? 'Accepted' : 'Rejected'}
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    style={[styles.actionButton, styles.viewProfileButton]}
                    onPress={() => onViewProfile(item.influencer.id)}
                    disabled={isUpdating}
                >
                    <Text style={styles.actionButtonText}>View Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    applicationCard: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    applicationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    influencerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(5, 101, 98, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    influencerTextInfo: {
        justifyContent: 'center',
    },
    influencerName: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: '600',
    },
    influencerUsername: {
        color: colors.textSecondary,
        fontSize: 14,
    },
    followersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    followersText: {
        color: colors.textSecondary,
        fontSize: 12,
        marginLeft: 4,
    },
    applicationActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    acceptButton: {
        backgroundColor: 'rgba(20, 160, 100, 0.6)',
    },
    rejectButton: {
        backgroundColor: 'rgba(200, 50, 50, 0.6)',
    },
    viewProfileButton: {
        backgroundColor: colors.accent,
    },
    actionButtonText: {
        color: colors.textPrimary,
        fontWeight: '500',
        fontSize: 14,
    },
    statusBadge: {
        flex: 2,
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    acceptedBadge: {
        backgroundColor: 'rgba(20, 160, 100, 0.6)',
    },
    rejectedBadge: {
        backgroundColor: 'rgba(200, 50, 50, 0.6)',
    },
    statusText: {
        color: colors.textPrimary,
        fontWeight: '500',
        fontSize: 14,
    },
    loadingContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    loadingText: {
        color: colors.textSecondary,
        marginLeft: 8,
        fontSize: 14,
    }
});

export default ApplicationItem;