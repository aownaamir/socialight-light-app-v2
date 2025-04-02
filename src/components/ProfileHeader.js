import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, Platform, StatusBar as RNStatusBar, Pressable } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/index';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileHeader = ({ navigation }) => {
  // Get safe area insets
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[
      styles.container,
      { paddingTop: Platform.OS === 'ios' ? insets.top : RNStatusBar.currentHeight || 10 }
    ]}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
                      <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                    </Pressable>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>SOCIALIGHT</Text>
        </View>
        <TouchableOpacity>
          <Feather name="grid" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default ProfileHeader;