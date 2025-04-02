import React, { useState, useRef } from 'react';
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
  Platform,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ProfileScreen = ({ navigation }) => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (sectionName) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    // If this section is already active, close it, otherwise open it
    if (activeSection === sectionName) {
      setActiveSection(null);
    } else {
      setActiveSection(sectionName);
    }
  };

  const CollapsibleSection = ({ name, title, icon, children }) => {
    const isExpanded = activeSection === name;
    
    return (
      <View style={styles.collapsibleSection}>
        <Pressable style={styles.menuItem} onPress={() => toggleSection(name)}>
          <View style={styles.menuItemLeft}>
            <Ionicons name={icon} size={22} color={colors.textPrimary} style={styles.menuIcon} />
            <Text style={styles.menuText}>{title}</Text>
          </View>
          <Ionicons 
            name={isExpanded ? "chevron-down" : "chevron-forward"} 
            size={20} 
            color={colors.textPrimary} 
          />
        </Pressable>
        
        {isExpanded && (
          <View style={styles.collapsibleContent}>
            {children}
          </View>
        )}
      </View>
    );
  };

  // Account Settings Content Component
  const AccountSettingsContent = () => (
    <View style={styles.settingsContent}>
      <TextInput
        style={styles.settingsInput}
        placeholder="First name"
        placeholderTextColor={colors.textSecondary}
      />
      <TextInput
        style={styles.settingsInput}
        placeholder="Last name"
        placeholderTextColor={colors.textSecondary}
      />
      <View style={styles.phoneInputContainer}>
        <View style={styles.countryCodeContainer}>
          <Text style={styles.countryCodeText}>+382</Text>
          <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
        </View>
        <View style={styles.phoneInputDivider} />
        <TextInput
          style={styles.phoneInput}
          placeholder="Phone number"
          placeholderTextColor={colors.textSecondary}
        />
      </View>
      <TextInput
        style={styles.settingsInput}
        placeholder="E-mail"
        placeholderTextColor={colors.textSecondary}
      />
      <Pressable style={styles.settingsInput}>
        <Text style={styles.placeholderText}>Change password</Text>
      </Pressable>
      <Pressable style={styles.settingsInput}>
        <Text style={styles.placeholderText}>Delete Account</Text>
      </Pressable>
    </View>
  );

  // Following Content Component
  const FollowingContent = () => (
    <View style={styles.followingContent}>
      {[1, 2, 3].map((item, index) => (
        <View key={index} style={styles.followingItem}>
          <View style={styles.followingItemLeft}>
            <Image 
              source={require('../../assets/images/bansko.png')}
              style={styles.followingImage}
            />
            <View style={styles.followingInfo}>
              <Text style={styles.followingName}>Bansko Caffe</Text>
              <Text style={styles.followingLocation}>Atena - Greec</Text>
            </View>
          </View>
          <Pressable style={styles.followingButton}>
            <Text style={styles.followingButtonText}>Following</Text>
          </Pressable>
        </View>
      ))}
      <Pressable style={styles.showAllButton}>
        <Text style={styles.showAllText}>Show All</Text>
        <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
      </Pressable>
    </View>
  );

  // Support Content Component
const SupportContent = () => (
  <View style={styles.supportContent}>
    <TextInput
      style={styles.supportInput}
      placeholder="Username"
      placeholderTextColor={colors.textSecondary}
    />
    <TextInput
      style={styles.supportInput}
      placeholder="E-mail"
      placeholderTextColor={colors.textSecondary}
    />
    <TextInput
      style={[styles.supportInput, styles.supportTextArea]}
      placeholder="Please describe your problem..."
      placeholderTextColor={colors.textSecondary}
      multiline={true}
      numberOfLines={5}
      textAlignVertical="top"
    />
  </View>
);



  // Privacy Content Component
  const PrivacyContent = () => (
    <View style={styles.privacyContent}>
      <Text style={styles.privacyTitle}>Terms and conditions & user agreement</Text>
      <View style={styles.privacyTextContainer}>
        <Text style={styles.privacyText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>
    </View>
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
          {/* Header */}
          {/* <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
            </Pressable>
            <Text style={styles.headerTitle}>Profile</Text>
            <Pressable>
              <Ionicons name="grid-outline" size={24} color={colors.textPrimary} />
            </Pressable>
          </View> */}

          {/* Profile Info */}
          <View style={styles.profileInfoContainer}>
            <View style={styles.profileImageContainer}>
              <Image 
                source={require('../../assets/images/profile.png')} 
                style={styles.profileImage}
              />
            </View>
            <Text style={styles.profileName}>Bert Berisaj</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>53.2k</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>53.2k</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
            </View>
          </View>

          {/* Add Photos Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Add photos</Text>
            <View style={styles.photosGrid}>
              <Pressable style={styles.addPhotoButton}>
                <Ionicons name="add" size={24} color={colors.textPrimary} />
              </Pressable>
              <Pressable style={styles.addPhotoButton}>
                <Ionicons name="add" size={24} color={colors.textPrimary} />
              </Pressable>
              <Pressable style={styles.addPhotoButton}>
                <Ionicons name="add" size={24} color={colors.textPrimary} />
              </Pressable>
            </View>
          </View>

          {/* Account Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Account</Text>
            
            {/* Account Settings Section - Collapsible */}
            <CollapsibleSection 
              name="accountSettings"
              title="Account settings" 
              icon="settings-outline"
            >
              <AccountSettingsContent />
            </CollapsibleSection>
            
            {/* Linked Accounts Section - Collapsible */}
            <CollapsibleSection 
              name="linkedAccounts"
              title="Linked Accounts" 
              icon="link-outline"
            >
              <View style={styles.socialLinksContainer}>
                <TextInput
                  style={styles.socialInput}
                  placeholder="Add your Instagram*"
                  placeholderTextColor="#9E9E9E"
                />
                <TextInput
                  style={styles.socialInput}
                  placeholder="Add your Facebook (optional)"
                  placeholderTextColor="#9E9E9E"
                />
                <TextInput
                  style={styles.socialInput}
                  placeholder="Add your TikTok (optional)"
                  placeholderTextColor="#9E9E9E"
                />
                <TextInput
                  style={styles.socialInput}
                  placeholder="Add your YouTube (optional)"
                  placeholderTextColor="#9E9E9E"
                />
              </View>
            </CollapsibleSection>

            {/* Following Section - Collapsible */}
            <CollapsibleSection 
              name="following"
              title="Following" 
              icon="people-outline"
            >
              <FollowingContent />
            </CollapsibleSection>
            
            {/* Support Section - Collapsible */}
            <CollapsibleSection 
  name="support"
  title="Support" 
  icon="call-outline"
>
  <SupportContent />
</CollapsibleSection>
            
            {/* Privacy Section - Collapsible */}
            <CollapsibleSection 
              name="privacy"
              title="Privacy" 
              icon="lock-closed-outline"
            >
              <PrivacyContent />
            </CollapsibleSection>
          </View>

          {/* Logout Button */}
          <Pressable style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 10 : 40, // Added extra padding to avoid navbar
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  profileInfoContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.accent,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    width: '80%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },
  statDivider: {
    width: 1,
    height: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
  },
  photosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addPhotoButton: {
    width: (width - 60) / 3,
    height: (width - 60) / 3,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  collapsibleSection: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    color: colors.textPrimary,
    fontSize: 15,
  },
  collapsibleContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  nestedContent: {
    padding: 15,
  },
  nestedText: {
    color: colors.textSecondary,
    fontSize: 14,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  socialLinksContainer: {
    padding: 15,
  },
  socialInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: colors.accent,
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
  },
  logoutText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },

  // Account Settings specific styles
  settingsContent: {
    padding: 15,
  },
  settingsInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 10,
    justifyContent: 'center',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 10,
    alignItems: 'center',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
  },
  countryCodeText: {
    color: colors.textSecondary,
    marginRight: 5,
  },
  phoneInputDivider: {
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: colors.textPrimary,
  },
  placeholderText: {
    color: colors.textSecondary,
  },

  // Following specific styles
  followingContent: {
    padding: 15,
  },
  followingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  followingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followingImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  followingInfo: {
    justifyContent: 'center',
  },
  followingName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  followingLocation: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  followingButton: {
    backgroundColor: colors.accent,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  followingButtonText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '500',
  },
  showAllButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  showAllText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginRight: 5,
  },

  // Privacy specific styles
  privacyContent: {
    padding: 15,
  },
  privacyTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
  privacyTextContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  privacyText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },// Support specific styles
  supportContent: {
    padding: 15,
  },
  supportInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 10,
  },
  supportTextArea: {
    height: 120,
    paddingTop: 15,
    textAlignVertical: 'top',
    borderRadius: 20,
  },
});

export default ProfileScreen;