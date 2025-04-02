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

const SignUpInfluencerPersonalInfo3Screen = ({ navigation }) => {
  const [isDemographics, setIsDemographics] = useState(true);
  const [selectedGender, setSelectedGender] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    'Fashion', 'Beauty', 'Fitness', 'Travel', 'Food', 
    'Lifestyle', 'Tech', 'Gaming', 'Business', 'Education'
  ];

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    } else {
      if (selectedCategories.length < 3) {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
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
              <View style={styles.demographicsContainer}>
                <Text style={styles.accountTypeText}>Account</Text>
                <Text style={styles.accountTypeSubtext}>Demographics</Text>
              </View>
              <Switch
                trackColor={{ false: 'rgba(255, 255, 255, 0.1)', true: colors.accent }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="rgba(255, 255, 255, 0.1)"
                onValueChange={() => setIsDemographics(!isDemographics)}
                value={isDemographics}
                style={styles.switch}
              />
            </View>

            {/* Gender selection */}
            <View style={styles.inputContainer}>
              <Text style={styles.sectionTitle}>Select your gender</Text>
              <View style={styles.genderContainer}>
                <Pressable 
                  style={[
                    styles.genderButton, 
                    selectedGender === 'male' && styles.selectedGender
                  ]}
                  onPress={() => setSelectedGender('male')}
                >
                  <Text style={[
                    styles.genderText,
                    selectedGender === 'male' && styles.selectedGenderText
                  ]}>Male</Text>
                </Pressable>
                <Pressable 
                  style={[
                    styles.genderButton, 
                    selectedGender === 'female' && styles.selectedGender
                  ]}
                  onPress={() => setSelectedGender('female')}
                >
                  <Text style={[
                    styles.genderText,
                    selectedGender === 'female' && styles.selectedGenderText
                  ]}>Female</Text>
                </Pressable>
                <Pressable 
                  style={[
                    styles.genderButton, 
                    selectedGender === 'other' && styles.selectedGender
                  ]}
                  onPress={() => setSelectedGender('other')}
                >
                  <Text style={[
                    styles.genderText,
                    selectedGender === 'other' && styles.selectedGenderText
                  ]}>Other</Text>
                </Pressable>
              </View>
              
              {/* Date of birth input */}
              <Text style={styles.sectionTitle}>Date of birth</Text>
              <View style={styles.dobInputContainer}>
                <TextInput
                  style={styles.dobInput}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor="#9E9E9E"
                  keyboardType="numeric"
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                />
                <Ionicons name="calendar-outline" size={20} color="rgba(255, 255, 255, 0.5)" />
              </View>
              <Text style={styles.inputHint}>Your age won't be displayed publicly</Text>
              
              {/* Content categories */}
              <Text style={styles.sectionTitle}>Choose your content categories (max 3)</Text>
              <View style={styles.categoriesContainer}>
                {categories.map((category) => (
                  <Pressable 
                    key={category}
                    style={[
                      styles.categoryButton,
                      selectedCategories.includes(category) && styles.selectedCategory
                    ]}
                    onPress={() => toggleCategory(category)}
                  >
                    <Text style={[
                      styles.categoryText,
                      selectedCategories.includes(category) && styles.selectedCategoryText
                    ]}>{category}</Text>
                  </Pressable>
                ))}
              </View>
              {selectedCategories.length === 0 && (
                <Text style={styles.inputError}>Please select at least one category</Text>
              )}
            </View>

            {/* Navigation buttons */}
            <View style={styles.navigationContainer}>
              <Pressable 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.backButtonText}>Back</Text>
              </Pressable>
              
              <Pressable 
                style={[
                  styles.nextButton,
                  (selectedGender === null || dateOfBirth === '' || selectedCategories.length === 0) && styles.disabledButton
                ]}
                onPress={() => {
                  if (selectedGender !== null && dateOfBirth !== '' && selectedCategories.length > 0) {
                    navigation.navigate('NextScreen'); // Replace with your next screen
                  }
                }}
              >
                <Text style={styles.nextButtonText}>Next</Text>
              </Pressable>
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
    justifyContent: 'center',
    marginBottom: 20,
  },
  demographicsContainer: {
    flexDirection: 'row',
  },
  accountTypeText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 5,
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
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  genderButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    width: '30%',
    alignItems: 'center',
  },
  selectedGender: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  genderText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  selectedGenderText: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  dobInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 5,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  dobInput: {
    flex: 1,
    color: colors.textPrimary,
    marginRight: 10,
  },
  inputHint: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 25,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedCategory: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  categoryText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  selectedCategoryText: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: 'transparent',
    paddingVertical: 13,
    borderRadius: 25,
    alignItems: 'center',
    width: '30%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '400',
  },
  nextButton: {
    backgroundColor: colors.accent,
    paddingVertical: 13,
    borderRadius: 25,
    alignItems: 'center',
    width: '30%',
  },
  disabledButton: {
    backgroundColor: 'rgba(5, 101, 98, 0.5)',
  },
  nextButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  inputError: {
    color: colors.textError,
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default SignUpInfluencerPersonalInfo3Screen;