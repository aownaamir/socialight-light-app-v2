import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, StatusBar as RNStatusBar, Pressable } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/index';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

const CustomHeader = ({ navigation }) => {
  const route = useRoute();
  // Get safe area insets
  const insets = useSafeAreaInsets();

  const photoScreens = ['Home', 'MyEvents']; // Screens that show photo icon
  const gridScreens = ['Profile'];
  const currentScreenName = route.name;
  const showPhotoIcon = photoScreens.includes(currentScreenName);
  const showGridIcon = gridScreens.includes(currentScreenName);
  
  return (
    <View style={[
      styles.container,
      { paddingTop: insets.top > 0 ? insets.top : RNStatusBar.currentHeight + 10 }
    ]}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>SOCIALIGHT</Text>
        </View>
        {showPhotoIcon ? (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={require('../../assets/images/profile.png')}
              style={styles.profileIcon}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Feather name="grid" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    // Removed duplicate padding logic
    // borderBottomWidth: 0.5,
    // borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12, // Increased vertical padding for more space
    marginTop: 6, // Added margin for extra spacing from the top
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

export default CustomHeader;