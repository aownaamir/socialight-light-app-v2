import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    ScrollView,
    Platform,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Image,
    Dimensions,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../store/context/authContext';
import { colors } from '../theme';
import { getCurrentUserApi } from '../apis/user';
import { updateInfluencerProfileApi } from '../apis/user';
import apiURL from '../apis/apiURL';

const { width } = Dimensions.get('window');

const EditInfluencerProfileScreen = ({ navigation }) => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

    // Form state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [youtube, setYoutube] = useState('');
    const [followers, setFollowers] = useState('');

    // Image URI states (for display)
    const [profilePicture, setProfilePicture] = useState('');
    const [professionalPhotos, setProfessionalPhotos] = useState([]);

    // Image data states (for upload) - similar to signup screen
    const [profilePictureData, setProfilePictureData] = useState(null);
    const [professionalPhotosData, setProfessionalPhotosData] = useState([]);

    useEffect(() => {
        fetchUserData();
        requestMediaLibraryPermissions();
    }, []);

    const requestMediaLibraryPermissions = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to upload images.');
            }
        }
    };

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const data = await getCurrentUserApi(token);

            // Populate form with existing user data
            setFirstName(data.first_name || '');
            setLastName(data.last_name || '');
            setFollowers(data.followers ? data.followers.toString() : '');

            // Set profile picture URI (for display)
            setProfilePicture(data.profile_picture || '');

            // Set professional photos URIs (for display)
            setProfessionalPhotos(data.professional_photos || []);

            // Initialize professional photos data array with nulls
            setProfessionalPhotosData(Array(data.professional_photos?.length || 0).fill(null));

            // Set social links if they exist
            if (data.social_links) {
                setInstagram(data.social_links.instagram || '');
                setFacebook(data.social_links.facebook || '');
                setTiktok(data.social_links.tiktok || '');
                setYoutube(data.social_links.youtube || '');
            }

            setError(null);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Failed to load profile data');
        } finally {
            setLoading(false);
        }
    };

    const pickProfileImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            // Set URI for display
            setProfilePicture(result.assets[0].uri);

            // Set complete file data for upload
            setProfilePictureData({
                uri: result.assets[0].uri,
                name: result.assets[0].uri.split('/').pop(),
                type: result.assets[0].uri.match(/\.(\w+)$/)
                    ? `image/${result.assets[0].uri.match(/\.(\w+)$/)[1]}`
                    : 'image'
            });
        }
    };

    const pickProfessionalPhoto = async (index) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            // Update the photos array for display
            const newPhotos = [...professionalPhotos];
            newPhotos[index] = result.assets[0].uri;
            setProfessionalPhotos(newPhotos);

            // Update the photos data array for upload
            const newPhotosData = [...professionalPhotosData];
            newPhotosData[index] = {
                uri: result.assets[0].uri,
                name: result.assets[0].uri.split('/').pop(),
                type: result.assets[0].uri.match(/\.(\w+)$/)
                    ? `image/${result.assets[0].uri.match(/\.(\w+)$/)[1]}`
                    : 'image'
            };
            setProfessionalPhotosData(newPhotosData);
        }
    };

    const handleUpdateProfile = async () => {
        setUpdating(true);
        try {
            // Create user data object
            const userData = {
                first_name: firstName,
                last_name: lastName,
                followers: parseInt(followers) || 0,
                social_links: {
                    instagram,
                    facebook,
                    tiktok,
                    youtube
                },
                profile_picture: profilePictureData.name,
                professional_photos: professionalPhotosData.map(photo => photo.name),
            };


            // Create FormData for profile picture
            const profileFormData = new FormData();
            if (profilePictureData) {

                // const profileImageUri = Platform.OS === 'android'
                //     ? profilePictureData.uri
                //     : profilePictureData.uri.replace('file://', '');

                // profileFormData.append('file', {
                //     uri: profileImageUri,
                //     type: profilePictureData.type,
                //     name: profilePictureData.name


                profileFormData.append('file', {
                    uri: profilePictureData.uri,
                    type: profilePictureData.type,
                    name: profilePictureData.name
                });
            }

            // Create FormData for professional photos
            const photosFormData = new FormData();
            professionalPhotosData.forEach((photo, index) => {
                if (photo) {
                    // const photoUri = Platform.OS === 'android'
                    //     ? photo.uri
                    //     : photo.uri.replace('file://', '');

                    // photosFormData.append('files', {
                    //     uri: photoUri,
                    //     type: photo.type,
                    //     name: photo.name


                    photosFormData.append('files', {
                        uri: photo.uri,
                        type: photo.type,
                        name: photo.name
                    });
                }
            });

            // Send the update to API with the three separate objects
            await updateInfluencerProfileApi(token, userData, profileFormData, photosFormData);
            Alert.alert('Success', 'Profile updated successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile');
            Alert.alert('Update Failed', error.message || 'Something went wrong');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <LinearGradient
                colors={[colors.background, colors.mapOverlay]}
                style={[styles.container, styles.loadingContainer]}
            >
                <ActivityIndicator size="large" color={colors.accent} />
                <Text style={styles.loadingText}>Loading profile data...</Text>
            </LinearGradient>
        );
    }

    // Helper function to get image source for professional photos
    const getPhotoSource = (index) => {
        if (professionalPhotos[index] && professionalPhotos[index].startsWith('http')) {
            // If it's already a full URL (from a new selection)
            return { uri: professionalPhotos[index] };
        } else if (professionalPhotos[index]) {
            // If it's a path from the API
            return { uri: `${apiURL}/uploads/${professionalPhotos[index]}` };
        }
        return null;
    };

    return (
        <LinearGradient
            colors={[colors.background, colors.mapOverlay]}
            style={styles.container}
        >
            <StatusBar style="light" />
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardAvoid}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Profile Photo Section */}
                        <View style={styles.profilePhotoSection}>
                            <Text style={styles.sectionTitle}>Profile Photo</Text>
                            <TouchableOpacity
                                onPress={pickProfileImage}
                                style={styles.profileImageContainer}
                            >
                                {profilePicture ? (
                                    profilePictureData ? (
                                        // Show newly selected image
                                        <Image
                                            source={{ uri: profilePictureData.uri }}
                                            style={styles.profileImage}
                                        />
                                    ) : (
                                        // Show existing image from API
                                        <Image
                                            source={{ uri: `${apiURL}/uploads/${profilePicture}` }}
                                            style={styles.profileImage}
                                        />
                                    )
                                ) : (
                                    <View style={styles.profileImagePlaceholder}>
                                        <Ionicons name="camera" size={32} color={colors.textSecondary} />
                                    </View>
                                )}
                            </TouchableOpacity>
                            <Text style={styles.photoHelpText}>Tap to change your profile photo</Text>
                        </View>

                        {/* Personal Information Section */}
                        <View style={styles.formSection}>
                            <Text style={styles.sectionTitle}>Personal Information</Text>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>First Name</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    placeholderTextColor={colors.textTertiary}
                                    placeholder="Enter your first name"
                                    color={colors.textPrimary}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Last Name</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={lastName}
                                    onChangeText={setLastName}
                                    placeholderTextColor={colors.textTertiary}
                                    placeholder="Enter your last name"
                                    color={colors.textPrimary}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Followers</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={followers}
                                    onChangeText={setFollowers}
                                    placeholderTextColor={colors.textTertiary}
                                    placeholder="Enter your follower count"
                                    keyboardType="numeric"
                                    color={colors.textPrimary}
                                />
                            </View>
                        </View>

                        {/* Professional Photos Section */}
                        <View style={styles.formSection}>
                            <Text style={styles.sectionTitle}>Professional Photos</Text>
                            <View style={styles.photosGrid}>
                                {[0, 1, 2].map((index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.photoItemContainer}
                                        onPress={() => pickProfessionalPhoto(index)}
                                    >
                                        {professionalPhotosData[index] ? (
                                            // Show newly selected image
                                            <Image
                                                source={{ uri: professionalPhotosData[index].uri }}
                                                style={styles.photoItem}
                                            />
                                        ) : professionalPhotos[index] ? (
                                            // Show existing image from API
                                            <Image
                                                source={{ uri: `${apiURL}/uploads/${professionalPhotos[index]}` }}
                                                style={styles.photoItem}
                                            />
                                        ) : (
                                            <View style={[styles.photoItem, styles.photoPlaceholder]}>
                                                <Ionicons name="add" size={24} color={colors.textSecondary} />
                                            </View>
                                        )}
                                        <View style={styles.photoEditIcon}>
                                            <Ionicons name="pencil" size={12} color={colors.textPrimary} />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={styles.photoHelpText}>Tap to add or change professional photos</Text>
                        </View>

                        {/* Social Media Links Section */}
                        <View style={styles.formSection}>
                            <Text style={styles.sectionTitle}>Social Media Links</Text>

                            <View style={styles.socialInputContainer}>
                                <View style={styles.socialIconContainer}>
                                    <Ionicons name="logo-instagram" size={20} color={colors.textPrimary} />
                                </View>
                                <TextInput
                                    style={styles.socialInput}
                                    value={instagram}
                                    onChangeText={setInstagram}
                                    placeholderTextColor={colors.textTertiary}
                                    placeholder="Instagram username"
                                    color={colors.textPrimary}
                                />
                            </View>

                            <View style={styles.socialInputContainer}>
                                <View style={styles.socialIconContainer}>
                                    <Ionicons name="logo-facebook" size={20} color={colors.textPrimary} />
                                </View>
                                <TextInput
                                    style={styles.socialInput}
                                    value={facebook}
                                    onChangeText={setFacebook}
                                    placeholderTextColor={colors.textTertiary}
                                    placeholder="Facebook username"
                                    color={colors.textPrimary}
                                />
                            </View>

                            <View style={styles.socialInputContainer}>
                                <View style={styles.socialIconContainer}>
                                    <Ionicons name="logo-tiktok" size={20} color={colors.textPrimary} />
                                </View>
                                <TextInput
                                    style={styles.socialInput}
                                    value={tiktok}
                                    onChangeText={setTiktok}
                                    placeholderTextColor={colors.textTertiary}
                                    placeholder="TikTok username"
                                    color={colors.textPrimary}
                                />
                            </View>

                            <View style={styles.socialInputContainer}>
                                <View style={styles.socialIconContainer}>
                                    <Ionicons name="logo-youtube" size={20} color={colors.textPrimary} />
                                </View>
                                <TextInput
                                    style={styles.socialInput}
                                    value={youtube}
                                    onChangeText={setYoutube}
                                    placeholderTextColor={colors.textTertiary}
                                    placeholder="YouTube channel name"
                                    color={colors.textPrimary}
                                />
                            </View>
                        </View>

                        {/* Update Button */}
                        <View style={styles.updateButtonContainer}>
                            <TouchableOpacity
                                onPress={handleUpdateProfile}
                                disabled={updating}
                                style={styles.updateButton}
                            >
                                <LinearGradient
                                    colors={[colors.accent, '#034946']}
                                    style={styles.updateButtonGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    {updating ? (
                                        <ActivityIndicator size="small" color={colors.textPrimary} />
                                    ) : (
                                        <>
                                            <Ionicons name="checkmark-outline" size={18} color={colors.textPrimary} />
                                            <Text style={styles.updateButtonText}>Update Profile</Text>
                                        </>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        {error && (
                            <Text style={styles.errorText}>{error}</Text>
                        )}
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: colors.textPrimary,
        marginTop: 10,
        fontSize: 16,
    },
    keyboardAvoid: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    // Profile Photo Section
    profilePhotoSection: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    profileImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: colors.accent,
        position: 'relative',
        marginBottom: 10,
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    profileImagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.accent,
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.background,
    },
    photoHelpText: {
        color: colors.textSecondary,
        fontSize: 12,
        marginTop: 5,
    },
    // Professional Photos Section
    photosGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    photoItemContainer: {
        position: 'relative',
        width: (width - 60) / 3,
        height: (width - 60) / 3,
    },
    photoItem: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    photoPlaceholder: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoEditIcon: {
        position: 'absolute',
        bottom: 6,
        right: 6,
        backgroundColor: colors.accent,
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.background,
    },
    // Form Sections
    formSection: {
        marginBottom: 30,
    },
    sectionTitle: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 15,
    },
    inputContainer: {
        marginBottom: 15,
    },
    inputLabel: {
        color: colors.textSecondary,
        fontSize: 14,
        marginBottom: 8,
    },
    textInput: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 14,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    socialInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 12,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    socialIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    socialInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 14,
    },
    updateButtonContainer: {
        marginTop: 10,
        marginBottom: 30,
    },
    updateButton: {
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    updateButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
    },
    updateButtonText: {
        color: colors.textPrimary,
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 8,
    },
    errorText: {
        color: colors.textError,
        textAlign: 'center',
        marginVertical: 10,
    },
});

export default EditInfluencerProfileScreen;