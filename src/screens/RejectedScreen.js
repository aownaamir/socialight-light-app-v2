import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const RejectedScreen = ({ navigation }) => {
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
            <Text style={styles.titleText}>Ops! Your profile was rejected</Text>
            
            <View style={styles.imageContainer}>
              <View style={styles.circularBorder1} />
              <View style={styles.circularBorder2} />
              <View style={styles.circularBorder3} />
              <Image
                source={require('../../assets/images/sunset-profile.jpg')}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
            
            <TouchableOpacity style={styles.rejectedButton}>
              <Text style={styles.rejectedButtonText}>Rejected</Text>
              <Ionicons name="close" size={18} color="#FFFFFF" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <Text style={styles.messageText}>
              Unfortunately your profile doesn't meet the criteria of Socialight.
              However, this is not the end.
            </Text>
            
            <TouchableOpacity 
              style={styles.okayButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.okayButtonText}>Okay</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.supportButton}
              onPress={() => navigation.navigate('Support')}
            >
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
  rejectedButton: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  rejectedButtonText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 5,
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
    marginBottom: 30,
    lineHeight: 22,
  },
  okayButton: {
    backgroundColor: colors.accent,
    paddingVertical: 13,
    borderRadius: 25,
    alignItems: 'center',
    width: '80%',
    marginBottom: 15,
  },
  okayButtonText: {
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

export default RejectedScreen;