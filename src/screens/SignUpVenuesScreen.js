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
  StatusBar,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../store/context/authContext';
import { signupVenueApi } from '../apis/auth';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

const SignUpVenuesScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [venueName, setVenueName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureData, setProfilePictureData] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [venueNameError, setVenueNameError] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { signup, error, clearError, isAuthenticated } = useAuth();


  const validateEmail = (text) => {
    setEmail(text);
    setEmailError('');
  };

  const handleImagePicker = async () => {
    Alert.alert(
      "Profile Picture",
      "Choose or take a photo for your venue profile",
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
              // Store ONLY the URI string for display purposes
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
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };


  const handleSignup = async () => {
    // Clear previous errors
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setPhoneNumberError('');
    setVenueNameError('');
    clearError();

    let isValid = true;

    // Validate first name
    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      isValid = false;
    }

    // Validate last name
    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      isValid = false;
    }

    // Validate email
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    // Validate password
    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    // Validate phone number
    if (!phoneNumber.trim()) {
      setPhoneNumberError('Phone number is required');
      isValid = false;
    }

    // Validate venue name
    if (!venueName.trim()) {
      setVenueNameError('Venue name is required');
      isValid = false;
    }

    // Validate terms agreement
    if (!agreeToTerms) {
      Alert.alert('Terms & Conditions', 'Please agree to the terms and conditions to continue.');
      isValid = false;
    }


    if (!isValid) return;

    try {
      setIsLoading(true);

      // First check if there's a profile picture
      if (!profilePicture || !profilePictureData) {
        Alert.alert('Profile Picture Required', 'Please select a profile picture');
        setIsLoading(false);
        return;
      }

      // Create the venue data
      const data = {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        venueName,
        agreeToTerms,
        profilePicture: profilePictureData.name,
      };

      const formData = new FormData();

      formData.append('file', profilePictureData);

      const userData = await signupVenueApi(data, formData);
      navigation.navigate('UserType');

    } catch (err) {
      if (err.response && err.response.status === 409) {
        setEmailError('This email is already registered');
      } else if (err.response && err.response.status === 400) {
        setEmailError('This user has not been onboarded yet');
      } else {
        Alert.alert(
          'Signup Error',
          'An error occurred while trying to sign up. Please try again later.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Authentication Error', error);
      clearError();
    }
  }, [error, clearError]);

  return (
    <LinearGradient
      colors={[colors.background, colors.mapOverlay]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
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
                <Text style={styles.tabButtonText}>For Venues</Text>
              </Pressable>
            </View>

            {/* Profile Picture */}
            <Pressable style={styles.profilePictureContainer} onPress={handleImagePicker}>
              <View style={styles.profilePicturePlaceholder}>
                {isUploading ? (
                  <ActivityIndicator color={colors.accent} size="large" />
                ) : profilePicture ? (
                  <Image source={{ uri: profilePicture }} style={styles.profilePictureImage} />
                ) : (
                  <Ionicons name="camera" size={30} color={colors.accent} />
                )}
              </View>
              <Text style={styles.profilePictureText}>Profile Picture</Text>
            </Pressable>

            {/* Form fields */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="First name"
                placeholderTextColor="#9E9E9E"
                value={firstName}
                onChangeText={(text) => {
                  setFirstName(text);
                  setFirstNameError('');
                }}
                editable={!isLoading}
              />
              {firstNameError ? (
                <Text style={styles.errorText}>{firstNameError}</Text>
              ) : null}

              <TextInput
                style={styles.input}
                placeholder="Last name"
                placeholderTextColor="#9E9E9E"
                value={lastName}
                onChangeText={(text) => {
                  setLastName(text);
                  setLastNameError('');
                }}
                editable={!isLoading}
              />
              {lastNameError ? (
                <Text style={styles.errorText}>{lastNameError}</Text>
              ) : null}

              <TextInput
                style={styles.input}
                placeholder="Venue name"
                placeholderTextColor="#9E9E9E"
                value={venueName}
                onChangeText={(text) => {
                  setVenueName(text);
                  setVenueNameError('');
                }}
                editable={!isLoading}
              />
              {venueNameError ? (
                <Text style={styles.errorText}>{venueNameError}</Text>
              ) : null}

              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#9E9E9E"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={validateEmail}
                editable={!isLoading}
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}

              <TextInput
                style={styles.input}
                placeholder="Phone number"
                placeholderTextColor="#9E9E9E"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={(text) => {
                  setPhoneNumber(text);
                  setPhoneNumberError('');
                }}
                editable={!isLoading}
              />
              {phoneNumberError ? (
                <Text style={styles.errorText}>{phoneNumberError}</Text>
              ) : null}

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  placeholderTextColor="#9E9E9E"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setPasswordError('');
                  }}
                  editable={!isLoading}
                />
                <Pressable
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#9E9E9E"
                  />
                </Pressable>
              </View>
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>

            {/* Terms agreement */}
            <View style={styles.termsContainer}>
              <Pressable
                style={styles.checkboxContainer}
                onPress={() => setAgreeToTerms(!agreeToTerms)}
                disabled={isLoading}
              >
                <Ionicons
                  name={agreeToTerms ? "checkmark-circle" : "ellipse-outline"}
                  size={20}
                  color={agreeToTerms ? colors.accent : "#9E9E9E"}
                />
              </Pressable>
              <Text style={styles.termsText}>
                Agree to <Text style={styles.termsLink}>terms and conditions</Text> & <Text style={styles.termsLink}>user agreement</Text>
              </Text>
            </View>

            {/* Signup button */}
            <Pressable
              style={[styles.signupButton, isLoading && styles.disabledButton]}
              onPress={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.background} size="small" />
              ) : (
                <Text style={styles.signupButtonText}>Signup</Text>
              )}
            </Pressable>

            {/* Request participation button */}
            <Pressable
              style={[styles.requestButton, isLoading && styles.disabledRequest]}
              onPress={handleSignup}
              disabled={isLoading}
            >
              <Text style={styles.requestButtonText}>Request participation</Text>
            </Pressable>

            {/* Back button */}
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              disabled={isLoading}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </Pressable>

            {/* Login link */}
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginLinkText}>Already have an account? </Text>
              <Pressable
                onPress={() => navigation.navigate('Login')}
                disabled={isLoading}
              >
                <Text style={styles.loginText}>Login</Text>
              </Pressable>
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
    // Add padding for status bar on Android
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 30,
    paddingBottom: 50, // Add extra padding at bottom
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10, // Add some margin from the top
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
    marginBottom: 25,
  },
  tabButton: {
    alignItems: 'center',
  },
  tabButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicturePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.accent,
    marginBottom: 8,
  },
  profilePictureImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  profilePictureText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: colors.textPrimary,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginLeft: 10,
    marginTop: -8,
    marginBottom: 8,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: colors.textPrimary,
  },
  eyeIcon: {
    paddingRight: 15,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  checkboxContainer: {
    marginRight: 8,
  },
  termsText: {
    color: colors.textSecondary,
    fontSize: 12,
    flex: 1,
  },
  termsLink: {
    color: colors.accent,
    textDecorationLine: 'underline',
  },
  signupButton: {
    backgroundColor: colors.accent,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 15,
    height: 50,
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 150, 0, 0.5)', // Assuming colors.accent is orange-ish
  },
  signupButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  requestButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.accent,
    height: 50,
  },
  disabledRequest: {
    borderColor: 'rgba(255, 150, 0, 0.5)', // Matching disabled button color
  },
  requestButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginLinkText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  loginText: {
    color: colors.accent,
    fontSize: 14,
  },
  backButton: {
    backgroundColor: 'transparent',
    paddingVertical: 13,
    borderRadius: 25,
    alignItems: 'center',
    width: '35%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
    height: 50,
    alignSelf: 'center',
  },
  backButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '400',
  },
});

export default SignUpVenuesScreen;