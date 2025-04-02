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
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const SignUpInfluencerScreen = ({ navigation }) => {
  const [isPersonalAccount, setIsPersonalAccount] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

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
              <Text style={styles.accountTypeSubtext}>Personal/Info</Text>
                </View>
              <Switch
                trackColor={{ false: 'rgba(255, 255, 255, 0.1)', true: colors.accent }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="rgba(255, 255, 255, 0.1)"
                onValueChange={() => setIsPersonalAccount(!isPersonalAccount)}
                value={isPersonalAccount}
                style={styles.switch}
              />
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
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="New Password"
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
              <Text style={styles.passwordHint}>Set up password of least 8 characters</Text>
              
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirm Password"
                  placeholderTextColor="#9E9E9E"
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <Pressable
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
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
                I agree to <Text style={styles.termsLink}>terms and conditions</Text> & <Text style={styles.termsLink}>user agreement</Text>
              </Text>
            </View>

            {/* Signup button */}
            <Pressable style={styles.signupButton} onPress={()=>navigation.navigate('Main')}>
              <Text style={styles.signupButtonText}>Become a Socialight</Text>
            </Pressable>

            {/* Login link */}
            <Pressable
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginLinkText}>Already have an account?<Text style={styles.textTogin}> Log In</Text></Text>
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
      justifyContent:'center',
      marginBottom: 10,
    },
    accountTypeText: {
        color: colors.textPrimary,
        fontSize: 14,
        fontWeight: '500',
        marginRight: 5,
    },
    personalInfoContainer: {
        flexDirection: 'row',
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
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: colors.textPrimary,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: colors.textPrimary,
  },
  eyeIcon: {
    paddingRight: 15,
  },
  passwordHint: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -20,
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
  loginLink: {
    paddingVertical: 5,
  },
  loginLinkText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  textTogin: {
      color: colors.accent,
      // fontSize: 14,
      // textAlign: 'center',
    },
});

export default SignUpInfluencerScreen;