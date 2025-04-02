import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { colors } from '../theme/index';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from "expo-linear-gradient";


const { width, height } = Dimensions.get('window');

const SignUpChooseScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={[colors.background, colors.mapOverlay]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
      
        <View style={styles.logoContainer}>
          {/* <View style={styles.logoFrame}> */}
            <Image
              source={require("../../assets/images/logo-circle.png")}
              style={styles.logo}
              resizeMode="contain"
            />
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
    // marginTop: height * 0.1,
    justifyContent: 'center',
    position: 'relative',
  },
  logoFrame: {
    width: width * 0.7,
    height: width * 0.7,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: width * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logo: {
    width: 400, 
    height: 400, 
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
    // fontSize: 14,
    // textAlign: 'center',
  },
});

export default SignUpChooseScreen; 