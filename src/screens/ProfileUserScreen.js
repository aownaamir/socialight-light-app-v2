import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppState, Linking } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  Pressable,
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
import SwipeWrapper from '../navigation/SwipeWrapper';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const UserProfileScreen = ({ navigation }) => {
  const { token } = useAuth();
  const logout = useAuth().logoutAuth;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const appState = useRef(AppState.currentState);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();

      const subscription = AppState.addEventListener('change', nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
          fetchUserData();
        }
        appState.current = nextAppState;
      });
      return () => {
        subscription.remove();
      };
    }, [])
  );



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
  };

  const handleLogout = () => {
    logoutApi();
    logout()
    return
  };

  const handleEditProfile = () => {
    navigation.navigate('ProfileUpdate');
  };


  const handleConnectInstagram = () => {
    const instagramAuthUrl = "https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1176217787528720&redirect_uri=https://1c4b-51-21-252-84.ngrok-free.app/auth/insta/callback&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights";

    Alert.alert(
      "Connect Instagram",
      "You'll be redirected to Instagram to authorize access to your account.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Continue",
          onPress: async () => {
            try {

              const result = await WebBrowser.openBrowserAsync(instagramAuthUrl);

              if (result.type === 'dismiss') {
                console.log("Browser was dismissed");
              }

              fetchUserData()
            } catch (error) {
              console.error("Error opening Instagram auth URL:", error);
              Alert.alert("Error", "Something went wrong. Please try again later.");
            }
          }
        }
      ]
    );

  };

  const shouldShowInstagramConnect = () => {
    if (!userData) return false;
    return (userData.followers === 0);
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
        <Pressable
          style={styles.retryButton}
          onPress={fetchUserData}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
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

            {shouldShowInstagramConnect() ? (
              <View style={styles.instagramConnectContainer}>
                <Pressable onPress={handleConnectInstagram} style={styles.instagramConnectButton}>
                  <LinearGradient
                    colors={['#833AB4', '#C13584', '#E1306C', '#FD1D1D']}
                    style={styles.instagramConnectGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name="logo-instagram" size={18} color={colors.textPrimary} />
                    <Text style={styles.instagramConnectText}>Connect with Instagram</Text>
                  </LinearGradient>
                </Pressable>
                <Text style={styles.instagramConnectSubtext}>Import your posts and followers</Text>
              </View>
            ) : (
              <View style={styles.statsContainer}>
                {/* <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{userData?.likes || 0}</Text>
                  <Text style={styles.statLabel}>Posts</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{userData?.event_count || 0}</Text>
                  <Text style={styles.statLabel}>Following</Text>
                </View> */}
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{userData?.followers || 0}</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
              </View>
            )}
          </View>

          {/* Action Buttons - Edit Profile */}
          <View style={styles.actionButtonsContainer}>
            {/* Edit Profile Button */}
            <Pressable onPress={handleEditProfile} style={styles.actionButton}>
              <LinearGradient
                colors={[colors.accent, '#034946']}
                style={styles.actionButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="pencil-outline" size={16} color={colors.textPrimary} />
                <Text style={styles.actionButtonText}>Edit Profile</Text>
              </LinearGradient>
            </Pressable>
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

          {/* Logout Button - Updated to match VenueProfileScreen */}
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>

          {/* Support Text */}
          <Text style={styles.supportText}>Need help? Contact support</Text>
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
  // statDivider: {
  //   width: 1,
  //   height: 25,
  //   backgroundColor: 'rgba(255, 255, 255, 0.2)',
  // },
  instagramConnectContainer: {
    alignItems: 'center',
    marginTop: 15,
    width: '80%',
  },
  instagramConnectButton: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#FD1D1D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 5,
  },
  instagramConnectGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  instagramConnectText: {
    color: colors.textPrimary,
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 8,
  },
  instagramConnectSubtext: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 5,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  actionButton: {
    width: '50%', // Adjusted width for the Edit Profile button
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
  // Updated logout button to match VenueProfileScreen style
  logoutButton: {
    backgroundColor: colors.accent,
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
  },
  logoutText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  supportText: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  }
});

export default UserProfileScreen;