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
  Switch,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { signupInfluencerApi } from '../apis/auth';

const { width, height } = Dimensions.get('window');

const SignUpInfluencerScreen = ({ navigation }) => {
  const [isPersonalInfo, setIsPersonalInfo] = useState(false);

  // Form state for account info
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [facebookHandle, setFacebookHandle] = useState('');
  const [tiktokHandle, setTiktokHandle] = useState('');
  const [youtubeHandle, setYoutubeHandle] = useState('');

  // Form state for personal info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Image state
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureData, setProfilePictureData] = useState(null); // Complete file data for upload
  const [professionalPhotos, setProfessionalPhotos] = useState([null, null, null]);
  const [professionalPhotosData, setProfessionalPhotosData] = useState([null, null, null]); // Complete file data for upload

  // Error state for account info
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [instagramHandleError, setInstagramHandleError] = useState('');
  const [facebookHandleError, setFacebookHandleError] = useState('');
  const [tiktokHandleError, setTiktokHandleError] = useState('');
  const [youtubeHandleError, setYoutubeHandleError] = useState('');

  // Error state for personal info
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Image picker permissions
  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow camera access to upload photos');
      return false;
    }
    return true;
  };

  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow media library access to upload photos');
      return false;
    }
    return true;
  };

  // Image picker function for profile photo
  const handleProfilePictureUpload = async () => {
    Alert.alert(
      "Profile Picture",
      "Choose or take a photo for your profile",
      [
        {
          text: "Choose from Gallery",
          onPress: async () => {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
              Alert.alert("Permission Required", "You need to allow access to your photos");
              return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            });

            if (!result.canceled) {
              // Store URI string for display purposes
              setProfilePicture(result.assets[0].uri);

              // Store the complete file data in a separate state variable
              setProfilePictureData({
                uri: result.assets[0].uri,
                name: result.assets[0].uri.split('/').pop(),
                type: result.assets[0].uri.match(/\.(\w+)$/)
                  ? `image/${result.assets[0].uri.match(/\.(\w+)$/)[1]}`
                  : 'image'
              });
            }
          }
        },
        {
          text: "Take Photo",
          onPress: async () => {
            if (await requestCameraPermissions()) {
              const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
              });

              if (!result.canceled) {
                setProfilePicture(result.assets[0].uri);

                setProfilePictureData({
                  uri: result.assets[0].uri,
                  name: result.assets[0].uri.split('/').pop(),
                  type: result.assets[0].uri.match(/\.(\w+)$/)
                    ? `image/${result.assets[0].uri.match(/\.(\w+)$/)[1]}`
                    : 'image'
                });
              }
            }
          }
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  // Image picker function for additional photos
  const handleAdditionalPhotoUpload = async (index) => {
    Alert.alert(
      "Professional Photo",
      "Choose or take a professional photo",
      [
        {
          text: "Choose from Gallery",
          onPress: async () => {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
              Alert.alert("Permission Required", "You need to allow access to your photos");
              return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.8,
            });

            if (!result.canceled) {
              // Update the photos array
              const newPhotos = [...professionalPhotos];
              newPhotos[index] = result.assets[0].uri;
              setProfessionalPhotos(newPhotos);

              // Update the photos data array for file upload
              const newPhotosData = [...professionalPhotosData];
              newPhotosData[index] = {
                uri: result.assets[0].uri,
                name: result.assets[0].uri.split('/').pop(),
                type: result.assets[0].uri.match(/\.(\w+)$/)
                  ? `image/${result.assets[0].uri.match(/\.(\w+)$/)[1]}`
                  : 'image'
              };
              setProfessionalPhotosData(newPhotosData);
            }
          }
        },
        {
          text: "Take Photo",
          onPress: async () => {
            if (await requestCameraPermissions()) {
              const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
              });

              if (!result.canceled) {
                // Update the photos array
                const newPhotos = [...professionalPhotos];
                newPhotos[index] = result.assets[0].uri;
                setProfessionalPhotos(newPhotos);

                // Update the photos data array for file upload
                const newPhotosData = [...professionalPhotosData];
                newPhotosData[index] = {
                  uri: result.assets[0].uri,
                  name: result.assets[0].uri.split('/').pop(),
                  type: result.assets[0].uri.match(/\.(\w+)$/)
                    ? `image/${result.assets[0].uri.match(/\.(\w+)$/)[1]}`
                    : 'image'
                };
                setProfessionalPhotosData(newPhotosData);
              }
            }
          }
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  // Form validation
  const validateForm = () => {
    let isValid = true;

    // First screen validation
    if (!isPersonalInfo) {
      // Email validation
      if (!email.trim()) {
        setEmailError('Email is required');
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setEmailError('Enter a valid email address');
        isValid = false;
      } else {
        setEmailError('');
      }

      // Password validation
      if (!password) {
        setPasswordError('Password is required');
        isValid = false;
      } else if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        isValid = false;
      } else {
        setPasswordError('');
      }

      // Phone validation
      if (!phoneNumber.trim()) {
        setPhoneError('Phone number is required');
        isValid = false;
      } else if (!/^\d{9,10}$/.test(phoneNumber.trim())) {
        setPhoneError('Enter a valid phone number');
        isValid = false;
      } else {
        setPhoneError('');
      }

      // InstagramHandle validation (required)
      if (!instagramHandle.trim()) {
        setInstagramHandleError('Instagram handle is required');
        isValid = false;
      } else if (instagramHandle.includes('@')) {
        setInstagramHandleError('Please enter only your handle without @');
        isValid = false;
      } else {
        setInstagramHandleError('');
      }

      // Optional fields validation (if provided)
      if (facebookHandle && facebookHandle.includes('@')) {
        setFacebookHandleError('Please enter only your handle without @');
        isValid = false;
      } else {
        setFacebookHandleError('');
      }

      if (tiktokHandle && tiktokHandle.includes('@')) {
        setTiktokHandleError('Please enter only your handle without @');
        isValid = false;
      } else {
        setTiktokHandleError('');
      }

      if (youtubeHandle && youtubeHandle.includes('@')) {
        setYoutubeHandleError('Please enter only your handle without @');
        isValid = false;
      } else {
        setYoutubeHandleError('');
      }

      return isValid;
    }

    // Personal info validation
    if (isPersonalInfo) {
      // First name validation
      if (!firstName.trim()) {
        setFirstNameError('First name is required');
        isValid = false;
      } else {
        setFirstNameError('');
      }

      // Last name validation
      if (!lastName.trim()) {
        setLastNameError('Last name is required');
        isValid = false;
      } else {
        setLastNameError('');
      }

      // Profile photo validation
      if (!profilePicture) {
        Alert.alert('Missing Photo', 'Please upload a profile photo');
        return false;
      }
    }

    return isValid;
  };

  // Next button handler
  const handleNext = () => {
    if (validateForm()) {
      setIsPersonalInfo(true);
    }
  };

  // Prepare form data for submission
  const prepareFormData = () => {
    // Create a new FormData instance for profile picture
    const formData = new FormData();

    // Add profile photo
    if (profilePictureData) {
      formData.append('file', profilePictureData);
    }

    return formData;
  };

  // Prepare professional photos form data
  const prepareProfessionalPhotosFormData = () => {
    // Create a new FormData instance for professional photos
    const photosFormData = new FormData();

    // Add professional photos that are not null
    professionalPhotosData.forEach((photo, index) => {
      if (photo) {
        photosFormData.append(`files`, photo);
      }
    });

    return photosFormData;
  };

  // Handle signup submission
  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      // Check if profile picture exists
      if (!profilePicture || !profilePictureData) {
        Alert.alert('Profile Picture Required', 'Please select a profile picture');
        setIsLoading(false);
        return;
      }

      // Create the user data object
      const userData = {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        instagramHandle,
        facebookHandle,
        tiktokHandle,
        youtubeHandle,
        profilePicture: profilePictureData.name, // Just send the filename
        professionalPhotos: professionalPhotosData
          .filter(photo => photo !== null)
          .map(photo => photo.name) // Just send the filenames
      };


      const profileFormData = prepareFormData();
      const photosFormData = prepareProfessionalPhotosFormData();

      const response = await signupInfluencerApi(userData, profileFormData, photosFormData);

      navigation.navigate('UserType');
    } catch (error) {
      console.error('Registration failed:', error);

      // Handle specific API errors
      if (error.response) {
        // Server responded with an error status
        const { status, data } = error.response;

        if (status === 400) {
          // Validation errors
          if (data.errors) {
            // Map backend errors to form fields
            const errorMapping = {
              'email': setEmailError,
              'password': setPasswordError,
              'phoneNumber': setPhoneError,
              'instagramHandle': setInstagramHandleError,
              'facebookHandle': setFacebookHandleError,
              'tiktokHandle': setTiktokHandleError,
              'youtubeHandle': setYoutubeHandleError,
              'firstName': setFirstNameError,
              'lastName': setLastNameError,
            };

            Object.entries(data.errors).forEach(([field, message]) => {
              if (errorMapping[field]) {
                errorMapping[field](message);
              }
            });
          } else {
            Alert.alert('Registration Error', data.message || 'Please check your information');
          }
        } else if (status === 409) {
          // Conflict - user already exists
          Alert.alert('Account Exists', 'An account with this information already exists');
        } else {
          // Other server errors
          Alert.alert('Server Error', 'Something went wrong. Please try again later.');
        }
      } else if (error.request) {
        // Request made but no response received
        Alert.alert('Network Error', 'Please check your internet connection and try again');
      } else {
        // Other errors
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isCompleteButtonEnabled = profilePicture !== null && firstName.trim() !== '' && lastName.trim() !== '' && !isLoading;

  const renderAccountInfoContent = () => (
    <>
      {/* Email input */}
      <View style={styles.inputContainer}>
        <View style={[
          styles.socialInputContainer,
          emailError ? styles.inputError : null
        ]}>
          <TextInput
            style={styles.socialInput}
            placeholder="Email address*"
            placeholderTextColor="#9E9E9E"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Password input */}
        <View style={[
          styles.socialInputContainer,
          passwordError ? styles.inputError : null
        ]}>
          <TextInput
            style={styles.socialInput}
            placeholder="Password*"
            placeholderTextColor="#9E9E9E"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        {/* Phone number input */}
        <View style={[
          styles.phoneInputContainer,
          phoneError ? styles.inputError : null
        ]}>
          <Text style={styles.countryCode}>+382</Text>
          <View style={styles.phoneInputDivider} />
          <TextInput
            style={styles.phoneInput}
            placeholder="Phone number"
            placeholderTextColor="#9E9E9E"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <Text style={styles.inputHint}>Why we need your phone number?</Text>
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

        <Text style={styles.sectionTitle}>Only Enter your handles</Text>

        <View style={[
          styles.socialInputContainer,
          instagramHandleError ? styles.inputError : null
        ]}>
          <TextInput
            style={styles.socialInput}
            placeholder="Add your Instagram*"
            placeholderTextColor="#9E9E9E"
            value={instagramHandle}
            onChangeText={setInstagramHandle}
          />
        </View>
        {instagramHandleError ? <Text style={styles.errorText}>{instagramHandleError}</Text> : null}

        <View style={[
          styles.socialInputContainer,
          facebookHandleError ? styles.inputError : null
        ]}>
          <TextInput
            style={styles.socialInput}
            placeholder="Add your Facebook (optional)"
            placeholderTextColor="#9E9E9E"
            value={facebookHandle}
            onChangeText={setFacebookHandle}
          />
        </View>
        {facebookHandleError ? <Text style={styles.errorText}>{facebookHandleError}</Text> : null}

        <View style={[
          styles.socialInputContainer,
          tiktokHandleError ? styles.inputError : null
        ]}>
          <TextInput
            style={styles.socialInput}
            placeholder="Add your TikTok (optional)"
            placeholderTextColor="#9E9E9E"
            value={tiktokHandle}
            onChangeText={setTiktokHandle}
          />
        </View>
        {tiktokHandleError ? <Text style={styles.errorText}>{tiktokHandleError}</Text> : null}

        <View style={[
          styles.socialInputContainer,
          youtubeHandleError ? styles.inputError : null
        ]}>
          <TextInput
            style={styles.socialInput}
            placeholder="Add your YouTube (optional)"
            placeholderTextColor="#9E9E9E"
            value={youtubeHandle}
            onChangeText={setYoutubeHandle}
          />
        </View>
        {youtubeHandleError ? <Text style={styles.errorText}>{youtubeHandleError}</Text> : null}
      </View>

      {/* Navigation buttons */}
      <View style={styles.navigationContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>

        <Pressable
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>
      </View>
    </>
  );

  const renderPersonalInfoContent = () => (
    <>
      {/* First Name input */}
      <View style={styles.inputContainer}>
        <View style={[
          styles.socialInputContainer,
          firstNameError ? styles.inputError : null
        ]}>
          <TextInput
            style={styles.socialInput}
            placeholder="First Name*"
            placeholderTextColor="#9E9E9E"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}

        {/* Last Name input */}
        <View style={[
          styles.socialInputContainer,
          lastNameError ? styles.inputError : null
        ]}>
          <TextInput
            style={styles.socialInput}
            placeholder="Last Name*"
            placeholderTextColor="#9E9E9E"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
      </View>

      {/* Profile Photo Upload */}
      <View style={styles.photoUploadSection}>
        <Text style={styles.sectionLabel}>Upload Profile Photo</Text>
        <Pressable
          style={styles.profilePictureContainer}
          onPress={handleProfilePictureUpload}
        >
          {isUploading ? (
            <ActivityIndicator color={colors.accent} size="large" />
          ) : profilePicture ? (
            <Image
              source={{ uri: profilePicture }}
              style={styles.profilePicture}
            />
          ) : (
            <Ionicons name="add" size={30} color="rgba(255, 255, 255, 0.5)" />
          )}
        </Pressable>
        <Text style={styles.uploadInstruction}>Upload or take three professional photos</Text>
      </View>

      {/* Additional Photos */}
      <View style={styles.professionalPhotosContainer}>
        {professionalPhotos.map((photo, index) => (
          <Pressable
            key={index}
            style={styles.additionalPhotoBox}
            onPress={() => handleAdditionalPhotoUpload(index)}
          >
            {photo ? (
              <Image
                source={{ uri: photo }}
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
        onPress={handleSignUp}
        disabled={!isCompleteButtonEnabled || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.completeButtonText}>Complete Registration</Text>
        )}
      </Pressable>

      {/* Go Back Button */}
      <Pressable
        style={styles.backButton}
        onPress={() => setIsPersonalInfo(false)}
        disabled={isLoading}
      >
        <Text style={styles.backButtonText}>Go back</Text>
      </Pressable>
    </>
  );

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
                {!isPersonalInfo ?
                  <Text style={styles.accountTypeText}>Account</Text> :
                  <Text style={styles.accountTypeText}>Personal Info</Text>
                }
              </View>
              <Switch
                trackColor={{ false: 'rgba(255, 255, 255, 0.1)', true: colors.accent }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="rgba(255, 255, 255, 0.1)"
                onValueChange={() => validateForm() && setIsPersonalInfo(!isPersonalInfo)}
                value={isPersonalInfo}
                style={styles.switch}
                disabled={isLoading}
              />
            </View>

            {/* Render content based on toggle state */}
            {isPersonalInfo ? renderPersonalInfoContent() : renderAccountInfoContent()}
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
    resizeMode: "contain",
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
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 5,
    paddingLeft: 15,
  },
  countryCode: {
    color: colors.textPrimary,
    paddingVertical: 12,
    fontSize: 14,
  },
  phoneInputDivider: {
    width: 1,
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 10,
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: colors.textPrimary,
  },
  inputHint: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  socialInputContainer: {
    marginBottom: 5,
    width: '100%',
  },
  socialInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: 'transparent',
    paddingVertical: 13,
    borderRadius: 25,
    alignItems: 'center',
    width: '30%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 20,
  },
  backButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '400',
  },
  nextButton: {
    backgroundColor: colors.accent,
    paddingVertical: 13,
    borderRadius: 25,
    alignItems: 'center',
    width: '30%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 20,
  },
  nextButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  inputError: {
    borderColor: colors.textError,
  },
  errorText: {
    color: colors.textError,
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
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
  profilePictureContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  profilePicture: {
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
  professionalPhotosContainer: {
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
    overflow: 'hidden',
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
});

export default SignUpInfluencerScreen;