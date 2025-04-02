import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import EventCard from '../components/EventCard';
import { eventsArray } from '../data/data';

const { width, height } = Dimensions.get('window');


const HomeScreen = ({ navigation }) => {
  // Events filtering by status
  const activeEvents = eventsArray.filter(event => event.status === 'Active');
  const upcomingEvents = eventsArray;

  // const handleEventPress = (id) => {
  //   // Navigate to event details screen
  //   navigation.navigate('EventDetails', { id });
  // };

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
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search here..."
              placeholderTextColor={colors.textSecondary}
            />
            <Ionicons name="mic" size={20} color={colors.textSecondary} />
          </View>

          {/* Most Popular Events Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Most popular event</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>view all</Text>
            </TouchableOpacity>
          </View>

          {/* Popular Events Horizontal Scroll - Dynamic */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.eventsScroll}
          >
            {activeEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
                // onPress={handleEventPress.bind(this,event.id)}
                variant="horizontal" // Optional since it's the default
              />
            ))}
          </ScrollView>

          {/* Upcoming Events Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming event</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>view all</Text>
            </TouchableOpacity>
          </View>
          
          {/* Upcoming Events Horizontal Scroll - Dynamic */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.eventsScroll}
          >
            {upcomingEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
                // onPress={handleEventPress} 
              />
            ))}
          </ScrollView>

          {/* Partners Section */}
          <View style={styles.partnersSection}>
            <Text style={styles.sectionTitle}>Socialight partners</Text>
            <View style={styles.partnersContainer}>
              <View style={styles.partnerDivider}>
                <Image
                  source={require('../../assets/images/jack-daniels.png')}
                  style={styles.partnerLogo}
                  resizeMode="cover"
                />
                <View style={styles.dividerLine} />
              </View>
              <View style={styles.partnerDivider}>
                <Image
                  source={require('../../assets/images/captain-morgan.png')}
                  style={styles.partnerLogo}
                  resizeMode="cover"
                />
                <View style={styles.dividerLine} />
              </View>
              <View style={styles.partnerDivider}>
                <Image
                  source={require('../../assets/images/gordons.png')}
                  style={styles.partnerLogo}
                  resizeMode="cover"
                />
                <View style={styles.dividerLine} />
              </View>
              <View style={styles.partnerDivider}>
                <Image
                  source={require('../../assets/images/redbull.png')}
                  style={styles.partnerLogo}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>

          {/* Contact Section */}
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Contact us</Text>
            <View style={styles.contactCard}>
              <View style={styles.contactContent}>
                <View style={styles.logoLarge}>
                  <Text style={styles.logoLargeText}>S</Text>
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Contact information</Text>
                  <Text style={styles.contactText}>info@socialight.vip</Text>
                  <Text style={styles.contactText}>www.socialight.vip</Text>
                  <Text style={styles.contactText}>Athens, Greece</Text>
                  <Text style={styles.tagline}>Unlock Exclusive Experiences with Socialight</Text>
                </View>
              </View>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
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
    paddingTop: 15,
    paddingBottom: 10,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 25,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    height: 45,
  },
  searchInput: {
    flex: 1,
    height: 45,
    paddingLeft: 10,
    color: colors.textPrimary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  viewAllText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  eventsScroll: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  partnersSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  partnersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center',
  },
  partnerDivider: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  partnerLogo: {
    width: width * 0.18,
    height: 35,
  },
  dividerLine: {
    width: 1,
    height: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginLeft: 10,
  },
  contactSection: {
    paddingHorizontal: 20,
  },
  contactCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
  },
  contactContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  logoLargeText: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '700',
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 5,
  },
  contactText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 2,
  },
  tagline: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 5,
    fontStyle: 'italic',
  },
});

export default HomeScreen;