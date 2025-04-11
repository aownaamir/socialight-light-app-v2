import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    Dimensions,
    ScrollView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const colors = {
    background: '#1A2F2F',
    mapOverlay: '#153B3B',
    textPrimary: '#FFFFFF',
    textSecondary: '#CBCBCB',
    accent: '#056562',
    starFilled: '#00A693',
    starEmpty: '#2C4141',
};

const UserShortProfileScreen = ({ navigation, route }) => {
    // We would normally receive the user data from route params in a real app
    // const { userData } = route.params;

    // For demo purposes, we'll use hardcoded data
    const userData = {
        name: 'Alex Johnson',
        posts: '27.8k',
        following: '243',
        followers: '31.5k',
        isFollowing: false,
        socialMedia: {
            instagram: '@alex_johnson',
            facebook: 'Alex Johnson',
            tiktok: 'alexjohnson',
            youtube: 'AlexJohnsonOfficial'
        }
    };

    const [isFollowing, setIsFollowing] = useState(userData.isFollowing);

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing);
        // Here you would make an API call to follow/unfollow the user
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleMessage = () => {
        // Navigate to messaging screen or start a conversation
        // navigation.navigate('Chat', { userId: userData.id });
        // console.log('Message button pressed');
    };

    return (
        <LinearGradient
            colors={[colors.background, colors.mapOverlay]}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                {/* Header with back button */}
                {/* <View style={styles.header}>
                    <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <View style={styles.placeholderRight} />
                </View> */}

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Profile Info */}
                    <View style={styles.profileInfoContainer}>
                        <View style={styles.profileImageContainer}>
                            <Image
                                source={require('../../assets/images/company-image.png')}
                                style={styles.profileImage}
                            />
                        </View>
                        <Text style={styles.profileName}>{userData.name}</Text>
                        <View style={styles.statsContainer}>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>{userData.posts}</Text>
                                <Text style={styles.statLabel}>Posts</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>{userData.following}</Text>
                                <Text style={styles.statLabel}>Following</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>{userData.followers}</Text>
                                <Text style={styles.statLabel}>Followers</Text>
                            </View>
                        </View>
                    </View>

                    {/* Follow and Message Buttons */}
                    <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity onPress={handleFollowToggle} style={styles.followButton}>
                            <LinearGradient
                                colors={isFollowing ? ['#2C4141', '#153B3B'] : [colors.accent, '#034946']}
                                style={styles.buttonGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Text style={styles.buttonText}>
                                    {isFollowing ? 'Following' : 'Follow'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleMessage} style={styles.messageButton}>
                            <View style={styles.messageButtonContent}>
                                <Ionicons name="chatbubble-outline" size={16} color={colors.textPrimary} />
                                <Text style={styles.messageText}>Message</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Photos Section */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Photos</Text>
                        <View style={styles.photosGrid}>
                            <Image
                                source={require('../../assets/images/photo1.jpg')}
                                style={styles.photoItem}
                            />
                            <Image
                                source={require('../../assets/images/photo2.jpg')}
                                style={styles.photoItem}
                            />
                            <Image
                                source={require('../../assets/images/photo3.jpg')}
                                style={styles.photoItem}
                            />
                        </View>
                    </View>

                    {/* Social Media Section */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Social media</Text>

                        <View style={styles.socialContainer}>
                            <View style={styles.socialItem}>
                                <View style={styles.socialIconContainer}>
                                    <Ionicons name="logo-instagram" size={20} color={colors.textPrimary} />
                                </View>
                                <Text style={styles.socialText}>{userData.socialMedia.instagram}</Text>
                            </View>

                            <View style={styles.socialItem}>
                                <View style={styles.socialIconContainer}>
                                    <Ionicons name="logo-facebook" size={20} color={colors.textPrimary} />
                                </View>
                                <Text style={styles.socialText}>{userData.socialMedia.facebook}</Text>
                            </View>

                            <View style={styles.socialItem}>
                                <View style={styles.socialIconContainer}>
                                    <Ionicons name="logo-tiktok" size={20} color={colors.textPrimary} />
                                </View>
                                <Text style={styles.socialText}>{userData.socialMedia.tiktok}</Text>
                            </View>

                            <View style={styles.socialItem}>
                                <View style={styles.socialIconContainer}>
                                    <Ionicons name="logo-youtube" size={20} color={colors.textPrimary} />
                                </View>
                                <Text style={styles.socialText}>{userData.socialMedia.youtube}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Review Section */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Review</Text>
                        <View style={styles.reviewContainer}>
                            <View style={styles.starsContainer}>
                                <Ionicons name="star" size={24} color={colors.starFilled} />
                                <Ionicons name="star" size={24} color={colors.starFilled} />
                                <Ionicons name="star" size={24} color={colors.starFilled} />
                                <Ionicons name="star" size={24} color={colors.starFilled} />
                                <Ionicons name="star-half" size={24} color={colors.starFilled} />
                            </View>
                            <Text style={styles.reviewScore}>4.5</Text>
                            <Text style={styles.reviewCount}>(124 reviews)</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 10 : 0,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        color: colors.textPrimary,
        fontSize: 18,
        fontWeight: '600',
    },
    placeholderRight: {
        width: 24, // Same width as back button for proper centering
    },
    profileInfoContainer: {
        alignItems: 'center',
        marginVertical: 15,
    },
    profileImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: colors.accent,
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    profileName: {
        color: colors.textPrimary,
        fontSize: 20,
        fontWeight: '600',
        marginTop: 10,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        width: '80%',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: '600',
    },
    statLabel: {
        color: colors.textSecondary,
        fontSize: 12,
        marginTop: 3,
    },
    statDivider: {
        width: 1,
        height: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 25,
        paddingHorizontal: 20,
    },
    followButton: {
        flex: 1,
        marginRight: 10,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    buttonGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 20,
    },
    buttonText: {
        color: colors.textPrimary,
        fontWeight: '600',
        fontSize: 14,
    },
    messageButton: {
        flex: 1,
        marginLeft: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        overflow: 'hidden',
    },
    messageButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
    },
    messageText: {
        color: colors.textPrimary,
        fontWeight: '500',
        fontSize: 14,
        marginLeft: 6,
    },
    sectionContainer: {
        marginTop: 25,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 15,
    },
    photosGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    photoItem: {
        width: (width - 60) / 3,
        height: (width - 60) / 3,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    socialContainer: {
        marginBottom: 10,
    },
    socialItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 25,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    socialIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    socialText: {
        color: colors.textPrimary,
        fontSize: 14,
    },
    reviewContainer: {
        alignItems: 'center',
        paddingVertical: 15,
    },
    starsContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    reviewScore: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: '600',
        marginTop: 5,
    },
    reviewCount: {
        color: colors.textSecondary,
        fontSize: 12,
        marginTop: 2,
    },
});

export default UserShortProfileScreen;