import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/index';

const { width } = Dimensions.get('window');

const OTPVerificationScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState('97272');
  // Assume user data is passed through route params
  const { userName, userType } = 
//   route.params ||
   { 
    userName: 'Bert Berišaj', 
    userType: 'Influencer' 
  };
  
  const handleBack = () => {
    navigation.goBack();
  };

  const handleVerify = () => {
    // Verify OTP logic here
    navigation.navigate('Dashboard');
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.mapOverlay]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>OTP</Text>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.smallLogo}
              resizeMode="contain"
            />
          </View>
        </View> */}

        <View style={styles.contentContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.circularFrameWrapper}>
              <Image
                source={require("../../assets/images/profile-pic.png")}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <View style={[styles.circleOutline, styles.circleOutline1]} />
              <View style={[styles.circleOutline, styles.circleOutline2]} />
              <View style={[styles.circleOutline, styles.circleOutline3]} />
            </View>

            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userType}>{userType}</Text>
          </View>

          <View style={styles.otpContainer}>
            <Text style={styles.otpLabel}>OTP</Text>
            <TextInput
              style={styles.otpInput}
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
              maxLength={5}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity 
            style={styles.verifyButton}
            onPress={handleVerify}
          >
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.helpContainer}>
            <Text style={styles.helpText}>Need help? Contact support</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '500',
  },
  logoContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallLogo: {
    width: 25,
    height: 25,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40, // Adjust to center content
  },
  profileContainer: {
    alignItems: 'center',
  },
  circularFrameWrapper: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  circleOutline: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: colors.accent,
    borderRadius: 100,
  },
  circleOutline1: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  circleOutline2: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderStyle: 'dashed',
    transform: [{ rotate: '45deg' }],
  },
  circleOutline3: {
    width: 190,
    height: 190,
    borderRadius: 95,
    borderStyle: 'dashed',
    opacity: 0.6,
    transform: [{ rotate: '-45deg' }],
  },
  userName: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  userType: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginTop: 5,
  },
  otpContainer: {
    marginTop: 40,
    alignItems: 'center',
    width: '100%',
  },
  otpLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
    alignSelf: 'center',
  },
  otpInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    width: '40%',
    padding: 12,
    fontSize: 22,
    color: colors.textPrimary,
    textAlign: 'center',
    letterSpacing: 2,
  },
  footerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: colors.accent,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  verifyButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  helpContainer: {
    alignItems: 'center',
  },
  helpText: {
    color: colors.accent,
    fontSize: 12,
  },
});

export default OTPVerificationScreen;