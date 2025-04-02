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
  StatusBar,
  Platform,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const SignUpVenuesScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [email, setEmail] = useState('');

  const validateEmail = (text) => {
    setEmail(text);
    // Simple validation - just showing the error message from the screenshot
    if (text.length > 0) {
      setEmailError('This user has not been onboarded yet');
    } else {
      setEmailError('');
    }
  };

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

            {/* Form fields */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="First name"
                placeholderTextColor="#9E9E9E"
              />
              <TextInput
                style={styles.input}
                placeholder="Last name"
                placeholderTextColor="#9E9E9E"
              />
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#9E9E9E"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={validateEmail}
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  placeholderTextColor="#9E9E9E"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <Pressable
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#9E9E9E"
                  />
                </Pressable>
              </View>
            </View>

            {/* Terms agreement */}
            <View style={styles.termsContainer}>
              <Pressable 
                style={styles.checkboxContainer}
                onPress={() => setAgreeToTerms(!agreeToTerms)}
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
            <Pressable style={styles.signupButton}>
              <Text style={styles.signupButtonText}>Signup</Text>
            </Pressable>
            
            {/* Request participation button */}
            <Pressable style={styles.requestButton}
             onPress={()=>navigation.navigate('Main')}>            >
              <Text style={styles.requestButtonText}>Request participation</Text>
            </Pressable>

            {/* Login link */}
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginLinkText}>Already have an account? </Text>
              <Pressable
                onPress={() => navigation.navigate('Login')}
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
    width: '100%',
    marginBottom: 15,
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
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.accent,
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
});

export default SignUpVenuesScreen;