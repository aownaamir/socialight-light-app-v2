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
  ScrollView,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/index';

const { width } = Dimensions.get('window');

const OTPScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState('97272');
  // User data can be passed through route params
  const { userName, userType } = route?.params || { 
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
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>OTP Verification</Text>
            
            <View style={styles.imageContainer}>
              <View style={styles.circularBorder1} />
              <View style={styles.circularBorder2} />
              <View style={styles.circularBorder3} />
              <Image
                source={require('../../assets/images/profile-pic.png')}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
            
            <TouchableOpacity style={styles.statusButton}>
              <Text style={styles.statusButtonText}>{userName}</Text>
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <Text style={styles.messageText}>
              {userType}
            </Text>
            
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
            
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleVerify}
            >
              <Text style={styles.primaryButtonText}>Verify</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.supportButton}>
              <Text style={styles.supportButtonText}>Need help? Contact support</Text>
            </TouchableOpacity>
          </View>
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
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  imageContainer: {
    position: 'relative',
    width: width * 0.6,
    height: width * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  circularBorder1: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: width * 0.3,
    borderWidth: 2,
    borderColor: colors.accent,
    borderStyle: 'dashed',
  },
  circularBorder2: {
    position: 'absolute',
    width: '90%',
    height: '90%',
    borderRadius: width * 0.27,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  circularBorder3: {
    position: 'absolute',
    width: '85%',
    height: '85%',
    borderRadius: width * 0.255,
    borderWidth: 3,
    borderColor: colors.accent,
  },
  profileImage: {
    width: '80%',
    height: '80%',
    borderRadius: width * 0.24,
  },
  statusButton: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  statusButtonText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
  },
  messageText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  otpContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  otpLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
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
  primaryButton: {
    backgroundColor: colors.accent,
    paddingVertical: 13,
    borderRadius: 25,
    alignItems: 'center',
    width: '80%',
    marginBottom: 15,
  },
  primaryButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  supportButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  supportButtonText: {
    color: colors.textTertiary,
    fontSize: 14,
  },
});

export default OTPScreen;