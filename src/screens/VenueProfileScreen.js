import React, { useState } from 'react';
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
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const VenueProfileScreen = ({ navigation }) => {
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
                  source={require('../../assets/images/company-image.png')} 
                  style={styles.profileImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          {/* Venue Info */}
          <View style={styles.venueInfoContainer}>
            <Text style={styles.venueName}>Zeus</Text>
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

          {/* Account Info Section */}
          <View style={styles.accountSection}>
            <Text style={styles.sectionTitle}>Account</Text>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Venue name"
                placeholderTextColor="#9E9E9E"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Location"
                placeholderTextColor="#9E9E9E"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#9E9E9E"
                keyboardType="email-address"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Website"
                placeholderTextColor="#9E9E9E"
                keyboardType="url"
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
          <Pressable style={styles.logoutButton}>
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