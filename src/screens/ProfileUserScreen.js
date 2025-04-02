import React from 'react';
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

const UserProfileScreen = ({ navigation }) => {
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
          {/* Header */}
          {/* <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
            </Pressable>
            <Text style={styles.headerTitle}>Profile</Text>
            <Pressable>
              <Ionicons name="grid-outline" size={24} color={colors.textPrimary} />
            </Pressable>
          </View> */}

          {/* Profile Info */}
          <View style={styles.profileInfoContainer}>
            <View style={styles.profileImageContainer}>
              <Image 
                source={require('../../assets/images/sunset-profile.jpg')}
                style={styles.profileImage}
              />
            </View>
            <Text style={styles.profileName}>Bert Berisaj</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>53.2k</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>53.2k</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
            </View>
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
                <Text style={styles.socialText}>@__berti</Text>
              </View>
              
              <View style={styles.socialItem}>
                <View style={styles.socialIconContainer}>
                  <Ionicons name="logo-facebook" size={20} color={colors.textPrimary} />
                </View>
                <Text style={styles.socialText}>Bert Berisaj</Text>
              </View>
              
              <View style={styles.socialItem}>
                <View style={styles.socialIconContainer}>
                  <Ionicons name="logo-tiktok" size={20} color={colors.textPrimary} />
                </View>
                <Text style={styles.socialText}>Berti</Text>
              </View>
              
              <View style={styles.socialItem}>
                <View style={styles.socialIconContainer}>
                  <Ionicons name="logo-youtube" size={20} color={colors.textPrimary} />
                </View>
                <Text style={styles.socialText}>Berti</Text>
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
              <Text style={styles.reviewText}>Give Bert Berisaj a review</Text>
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
});

export default UserProfileScreen;