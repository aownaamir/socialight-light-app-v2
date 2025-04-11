// VenueProfileScreen modifications - Edit button side by side with My Events
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  Platform,
  LayoutAnimation,
  UIManager,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { logoutApi } from '../apis/auth';
import { getCurrentUserApi } from '../apis/user';
import { useAuth } from '../store/context/authContext';
import apiURL from '../apis/apiURL';


const { width, height } = Dimensions.get('window');

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const VenueProfileScreen = ({ navigation }) => {
  const { token } = useAuth();
  const logout = useAuth().logoutAuth;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const data = await getCurrentUserApi(token);
        setUserData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleMyEvents = () => {
    // Navigate to My Events screen when implemented
    navigation.navigate('ProfileEvents');
    // console.log('My Events pressed');
  };

  const handleLogout = () => {
    logoutApi();
    logout()
    return
  };

  const handleEditProfile = () => {
    navigation.navigate('ProfileEditVenueProfile');
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
          onPress={() => {
            getCurrentUserApi(token)
              .then(data => {
                setUserData(data);
                setError(null);
              })
              .catch(err => {
                console.error('Error retrying user data fetch:', err);
                setError('Failed to load profile data');
              });
          }}
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
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Cover Photo with Profile Image */}
          <View style={styles.coverContainer}>
            <Image
              source={require('../../assets/images/sunset-profile.jpg')}
              style={styles.coverPhoto}
              resizeMode="cover"
            />

            <View style={styles.profileImageWrapper}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: `${apiURL}/uploads/${userData.profile_picture}` }} style={styles.profileImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          {/* Venue Info */}
          <View style={styles.venueInfoContainer}>
            <Text style={styles.venueName}>{userData?.venue_name || 'Venue'}</Text>
            <Text style={styles.venueType}>Venue</Text>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>53.2k</Text>
                <Text style={styles.statLabel}>Likes</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>My events</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>53.2k</Text>
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

          {/* Account Info Section */}
          <View style={styles.accountSection}>
            <Text style={styles.sectionTitle}>Account</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Venue name"
                placeholderTextColor="#9E9E9E"
                editable={false}
                value={userData?.venue_name || ''}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Location"
                placeholderTextColor="#9E9E9E"
                editable={false}
                value="Miami, FL" // Keep this as-is since location isn't in the API response
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#9E9E9E"
                keyboardType="email-address"
                editable={false}
                value={userData?.email || ''}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Website"
                placeholderTextColor="#9E9E9E"
                keyboardType="url"
                editable={false}
                value="www.zeus-club.com" // Keep this as-is since website isn't in the API response
              />
            </View>
          </View>

          {/* Add Photos Section */}
          <View style={styles.photosSection}>
            <Text style={styles.sectionTitle}>Add photos</Text>
            <View style={styles.photosGrid}>
              <Pressable style={styles.addPhotoButton}>
                <Text style={styles.addText}>Add</Text>
                <Ionicons name="add" size={20} color={colors.textPrimary} />
              </Pressable>
              <Pressable style={styles.addPhotoButton}>
                <Text style={styles.addText}>Add</Text>
                <Ionicons name="add" size={20} color={colors.textPrimary} />
              </Pressable>
              <Pressable style={styles.addPhotoButton}>
                <Text style={styles.addText}>Add</Text>
                <Ionicons name="add" size={20} color={colors.textPrimary} />
              </Pressable>
            </View>
          </View>

          {/* Logout Button */}
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
    // Add padding for status bar height
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
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
    marginTop: Platform.OS === 'ios' ? 10 : 0,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  coverContainer: {
    position: 'relative',
    height: 130,
    marginBottom: 40,
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
  },
  profileImageWrapper: {
    position: 'absolute',
    bottom: -40,
    width: '100%',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  venueInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  venueName: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '600',
  },
  venueType: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    width: '90%',
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
  accountSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  photosSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  photosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addPhotoButton: {
    width: (width - 60) / 3,
    height: (width - 60) / 3,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
  },
  addText: {
    color: colors.textPrimary,
    marginRight: 2,
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: colors.accent,
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
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
  },
});

export default VenueProfileScreen;