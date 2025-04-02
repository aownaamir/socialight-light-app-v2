import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  Dimensions,
  Switch,
  ScrollView,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const SignUpInfluencerPersonalInfo2Screen = ({ navigation }) => {
  const [isPersonalInfo, setIsPersonalInfo] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [additionalPhotos, setAdditionalPhotos] = useState([null, null, null]);

  const handleProfilePhotoUpload = () => {
    // Implement photo upload functionality
    console.log("Upload profile photo");
    // This would normally connect to image picker
    setProfilePhoto({ uri: 'https://example.com/temp-photo.jpg' });
  };

  const handleAdditionalPhotoUpload = (index) => {
    // Implement additional photo upload functionality
    console.log(`Upload additional photo at index ${index}`);
    // This would normally connect to image picker
    const newPhotos = [...additionalPhotos];
    newPhotos[index] = { uri: 'https://example.com/temp-photo.jpg' };
    setAdditionalPhotos(newPhotos);
  };

  const isCompleteButtonEnabled = profilePhoto !== null;

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
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.brandName}>SOCIALIGHT</Text>
          </View>

          <View style={styles.formContainer}>
            {/* Tab selection */}
            <View style={styles.tabContainer}>
              <Pressable style={styles.tabButton}>
                <Text style={styles.tabButtonText}>For Influencers</Text>
              </Pressable>
            </View>

            {/* Account type toggle */}
            <View style={styles.accountTypeContainer}>
              <View style={styles.personalInfoContainer}>
                <Text style={styles.accountTypeText}>Account</Text>
                <Text style={styles.accountTypeSubtext}>Personal Info</Text>
              </View>
              <Switch
                trackColor={{ false: 'rgba(255, 255, 255, 0.1)', true: colors.accent }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="rgba(255, 255, 255, 0.1)"
                onValueChange={() => setIsPersonalInfo(!isPersonalInfo)}
                value={isPersonalInfo}
                style={styles.switch}
              />
            </View>

            {/* Profile Photo Upload */}
            <View style={styles.photoUploadSection}>
              <Text style={styles.sectionLabel}>Upload Profile Photo</Text>
              <Pressable 
                style={styles.profilePhotoContainer}
                onPress={handleProfilePhotoUpload}
              >
                {profilePhoto ? (
                  <Image 
                    source={profilePhoto} 
                    style={styles.profilePhoto} 
                  />
                ) : (
                  <Ionicons name="add" size={30} color="rgba(255, 255, 255, 0.5)" />
                )}
              </Pressable>
              <Text style={styles.uploadInstruction}>Upload or take three professional photos</Text>
            </View>

            {/* Additional Photos */}
            <View style={styles.additionalPhotosContainer}>
              {additionalPhotos.map((photo, index) => (
                <Pressable 
                  key={index}
                  style={styles.additionalPhotoBox}
                  onPress={() => handleAdditionalPhotoUpload(index)}
                >
                  {photo ? (
                    <Image 
                      source={photo} 
                      style={styles.additionalPhoto} 
                    />
                  ) : (
                    <Ionicons name="add" size={24} color="rgba(255, 255, 255, 0.5)" />
                  )}
                </Pressable>
              ))}
            </View>

            {/* Complete Registration Button */}
            <Pressable 
              style={[
                styles.completeButton,
                !isCompleteButtonEnabled && styles.disabledButton
              ]}
              onPress={() => {
                if (isCompleteButtonEnabled) {
                  navigation.navigate('RegistrationComplete');
                }
              }}
            >
              <Text style={styles.completeButtonText}>Complete Registration</Text>
            </Pressable>

            {/* Go Back Button */}
            <Pressable 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>Go back</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  brandName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 2,
    marginTop: 5,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  tabContainer: {
    backgroundColor: colors.accent,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  tabButton: {
    alignItems: 'center',
  },
  tabButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  accountTypeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  personalInfoContainer: {
    flexDirection: 'row',
  },
  accountTypeText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 5,
  },
  accountTypeSubtext: {
    color: colors.accent,
    fontSize: 12,
    marginRight: 10,
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  photoUploadSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 15,
    alignSelf: 'center',
  },
  profilePhotoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  uploadInstruction: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  additionalPhotosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  additionalPhotoBox: {
    width: width * 0.25,
    height: width * 0.25,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  additionalPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  completeButton: {
    backgroundColor: colors.accent,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  disabledButton: {
    backgroundColor: 'rgba(5, 101, 98, 0.5)',
  },
  completeButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '400',
  },
});

export default SignUpInfluencerPersonalInfo2Screen;