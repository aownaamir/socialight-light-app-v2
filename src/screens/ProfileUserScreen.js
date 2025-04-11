import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { logoutApi } from '../apis/auth';
import { useAuth } from '../store/context/authContext';
import { colors } from '../theme';
import { getCurrentUserApi } from '../apis/user';
import apiURL from '../apis/apiURL';

const { width } = Dimensions.get('window');

const UserProfileScreen = ({ navigation }) => {
  const { token } = useAuth();
  const logout = useAuth().logoutAuth;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const data = await getCurrentUserApi(token);
      setUserData(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleMyEvents = () => {
    navigation.navigate('ProfileEvents');
    // console.log('My Events pressed');
  };

  const handleLogout = () => {
    logoutApi();
    logout()
    return
  };

  const handleEditProfile = () => {
    navigation.navigate('ProfileUpdate');
    // console.log('Edit Profile pressed');
  };

  if (loading) {
    return (
      <LinearGradient
        colors={[colors.background, colors.mapOverlay]}
        style={[styles.container, styles.loadingContainer]}
      >
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient
        colors={[colors.background, colors.mapOverlay]}
        style={[styles.container, styles.loadingContainer]}
      >
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchUserData}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

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
          {/* Profile Info */}
          <View style={styles.profileInfoContainer}>
            <View style={styles.profileHeader}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: `${apiURL}/uploads/${userData.profile_picture}` }}
                  style={styles.profileImage}
                />
              </View>
            </View>

            <Text style={styles.profileName}>
              {userData ? `${userData.first_name} ${userData.last_name}` : 'Loading...'}
            </Text>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userData?.likes || 0}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userData?.event_count || 0}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userData?.followers || 0}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons - Edit Profile and My Events side by side */}
          <View style={styles.actionButtonsContainer}>
            {/* Edit Profile Button */}
            <TouchableOpacity onPress={handleEditProfile} style={styles.actionButton}>
              <LinearGradient
                colors={[colors.accent, '#034946']}
                style={styles.actionButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="pencil-outline" size={16} color={colors.textPrimary} />
                <Text style={styles.actionButtonText}>Edit Profile</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* My Events Button */}
            <TouchableOpacity onPress={handleMyEvents} style={styles.actionButton}>
              <LinearGradient
                colors={[colors.accent, '#034946']}
                style={styles.actionButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="calendar" size={16} color={colors.textPrimary} />
                <Text style={styles.actionButtonText}>My Events</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Photos Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Photos</Text>
            <View style={styles.photosGrid}>
              <Image
                source={{ uri: `${apiURL}/uploads/${userData.professional_photos[0]}` }}
                style={styles.photoItem}
              />
              <Image
                source={{ uri: `${apiURL}/uploads/${userData.professional_photos[1]}` }}
                style={styles.photoItem}
              />
              <Image
                source={{ uri: `${apiURL}/uploads/${userData.professional_photos[2]}` }}
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
                <Text style={styles.socialText}>
                  @{userData?.social_links?.instagram || ''}
                </Text>
              </View>

              <View style={styles.socialItem}>
                <View style={styles.socialIconContainer}>
                  <Ionicons name="logo-facebook" size={20} color={colors.textPrimary} />
                </View>
                <Text style={styles.socialText}>
                  {userData?.social_links?.facebook || ''}
                </Text>
              </View>

              <View style={styles.socialItem}>
                <View style={styles.socialIconContainer}>
                  <Ionicons name="logo-tiktok" size={20} color={colors.textPrimary} />
                </View>
                <Text style={styles.socialText}>
                  {userData?.social_links?.tiktok || ''}
                </Text>
              </View>

              <View style={styles.socialItem}>
                <View style={styles.socialIconContainer}>
                  <Ionicons name="logo-youtube" size={20} color={colors.textPrimary} />
                </View>
                <Text style={styles.socialText}>
                  {userData?.social_links?.youtube || ''}
                </Text>
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
                <Ionicons name="star-outline" size={24} color={colors.starEmpty} />
              </View>
              <Text style={styles.reviewText}>
                Give {userData ? `${userData.first_name} ${userData.last_name}` : ''} a review
              </Text>
            </View>
          </View>

          {/* Logout Button */}
          <View style={styles.logoutContainer}>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <View style={styles.logoutContent}>
                <Ionicons name="log-out-outline" size={20} color={colors.textPrimary} />
                <Text style={styles.logoutText}>Logout</Text>
              </View>
            </TouchableOpacity>
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.textPrimary,
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  retryButton: {
    backgroundColor: colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 15,
  },
  retryButtonText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 10 : 40,
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
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  profileInfoContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  profileHeader: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 5,
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
  // Action Buttons Container (Edit Profile + My Events)
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 25,
    gap: 15, // Space between buttons
  },
  actionButton: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  actionButtonText: {
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
  reviewText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 5,
  },
  // Logout Button Styles
  logoutContainer: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  logoutButton: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  logoutText: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default UserProfileScreen;