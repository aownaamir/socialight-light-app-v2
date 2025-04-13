import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get('window');

const SignUpChooseScreen = ({ navigation }) => {
  // Animation references
  const outerRotation = useRef(new Animated.Value(0)).current;
  const innerRotation = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Outer circle rotation animation
    Animated.loop(
      Animated.timing(outerRotation, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();

    // Inner circle rotation animation (opposite direction)
    Animated.loop(
      Animated.timing(innerRotation, {
        toValue: 1,
        duration: 15000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();

    // Logo fade-in and scale animation
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: true
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: true
      })
    ]).start();
  }, []);

  // Convert rotation values to interpolated strings
  const outerRotateStr = outerRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const innerRotateStr = innerRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg']
  });

  return (
    <LinearGradient
      colors={[colors.background, colors.mapOverlay]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.logoContainer}>
          <View style={styles.animationContainer}>
            <Animated.View
              style={[
                styles.logoBorder,
                { transform: [{ rotate: outerRotateStr }] }
              ]}
            />
            <Animated.View
              style={[
                styles.innerBorder,
                { transform: [{ rotate: innerRotateStr }] }
              ]}
            />
          </View>
          <Animated.View
            style={[
              styles.absoluteLogoContainer,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }]
              }
            ]}
          >
            <Image
              source={require("../../assets/images/logo-text.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        <Text style={styles.promoText}>
          Promote events & grow your audience
        </Text>

        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => navigation.navigate('InfluencerSignup')}
          >
            <Text style={styles.primaryButtonText}>Sign up as an influencer</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('VenueSignup')}
          >
            <Text style={styles.secondaryButtonText}>Sign up as a venue</Text>
          </Pressable>

          <Pressable
            style={styles.textButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.textButtonText}>Already have an account?<Text style={styles.textTogin}> Log In</Text></Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 260,
    height: 200,
    marginTop: 80,
    marginBottom: 65,
  },
  animationContainer: {
    width: 240,
    height: 380,
    // position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBorder: {
    width: 220,
    height: 360,
    borderRadius: 130,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    position: 'absolute',
    top: 14,
    left: 0,
  },
  innerBorder: {
    width: 220,
    height: 360,
    borderRadius: 130,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 14,
    left: 0,
  },
  absoluteLogoContainer: {
    position: 'absolute',
    width: 150,
    height: 150,
    zIndex: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  promoText: {
    color: colors.textSecondary,
    fontSize: 24,
    textAlign: 'center',
    paddingHorizontal: 40,
    marginVertical: 30,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 50,
    gap: 15,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
  },
  primaryButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: colors.textSecondary,
  },
  secondaryButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  textButton: {
    paddingVertical: 10,
  },
  textButtonText: {
    color: colors.textPrimary,
    fontSize: 14,
    textAlign: 'center',
  },
  textTogin: {
    color: colors.accent,
  },
});

export default SignUpChooseScreen;