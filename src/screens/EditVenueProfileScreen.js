import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TextInput,
    ScrollView,
    Platform,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../store/context/authContext';
import { colors } from '../theme';
import { getCurrentUserApi } from '../apis/user';
import { updateVenueProfileApi } from '../apis/user'; // Import the update API
import apiURL from '../apis/apiURL';

const EditVenueProfileScreen = ({ navigation }) => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null)

    // Form state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [venueName, setVenueName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [profilePictureData, setProfilePictureData] = useState(null);

    // Local state for UI display of profile picture
    // const [profileImageUri, setProfileImageUri] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const data = await getCurrentUserApi(token);
            setUserData(data)

            setFirstName(data.first_name || '');
            setLastName(data.last_name || '');
            setVenueName(data.venue_name || '');
            setProfilePicture(data.profile_picture || '');

            setError(null);
        } catch (error) {
            console.error('Error fetching venue data:', error);
            setError('Failed to load profile userData');
        } finally {
            setLoading(false);
        }
    };

    // Request camera permissions
    const requestCameraPermissions = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission Required", "You need to allow access to your camera");
            return false;
        }
        return true;
    };

    // Handle profile picture upload
    const handleProfilePictureUpload = async () => {
        Alert.alert(
            "Profile Picture",
            "Choose or take a photo for your profile",
            [
                {
                    text: "Choose from Gallery",
                    onPress: async () => {
                        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

                        if (permissionResult.granted === false) {
                            Alert.alert("Permission Required", "You need to allow access to your photos");
                            return;
                        }

                        const result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [1, 1],
                            quality: 0.8,
                        });

                        if (!result.canceled) {
                            // Update UI immediately with the selected image
                            // setProfileImageUri(result.assets[0].uri);

                            // Store the complete file userData in profilePicture
                            setProfilePicture(result.assets[0].uri.split('/').pop())
                            setProfilePictureData({
                                uri: result.assets[0].uri,
                                name: result.assets[0].uri.split('/').pop(),
                                type: result.assets[0].uri.match(/\.(\w+)$/)
                                    ? `image/${result.assets[0].uri.match(/\.(\w+)$/)[1]}`
                                    : 'image/jpeg'
                            });
                        }
                    }
                },
                {
                    text: "Take Photo",
                    onPress: async () => {
                        if (await requestCameraPermissions()) {
                            const result = await ImagePicker.launchCameraAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                aspect: [1, 1],
                                quality: 0.8,
                            });

                            if (!result.canceled) {
                                // Update UI immediately with the taken photo
                                // seult.assets[0].uri);

                                // Store the complete file userData in profilePicture
                                setProfilePicture({
                                    uri: result.assets[0].uri,
                                    name: result.assets[0].uri.split('/').pop(),
                                    type: result.assets[0].uri.match(/\.(\w+)$/)
                                        ? `image/${result.assets[0].uri.match(/\.(\w+)$/)[1]}`
                                        : 'image/jpeg'
                                });
                            }
                        }
                    }
                },
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ]
        );
    };

    const handleUpdateProfile = async () => {
        if (!venueName.trim()) {
            Alert.alert('Error', 'Venue name is required');
            return;
        }

        setUpdating(true);
        try {

            const formData = new FormData();

            const userData = {
                first_name: firstName,
                last_name: lastName,
                profile_picture: profilePicture,
                venue_name: venueName,
            }

            profilePictureData && formData.append('file', profilePictureData)

            await updateVenueProfileApi(token, userData, formData);
            Alert.alert('Success', 'Venue profile updated successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating venue profile:', error);
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
                <Text style={styles.loadingText}>Loading profile userData...</Text>
            </LinearGradient>
        );
    }

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
                        {/* Cover Photo and Profile Image Section */}
                        <View style={styles.coverContainer}>
                            <Image
                                source={require('../../assets/images/sunset-profile.jpg')}
                                style={styles.coverPhoto}
                                resizeMode="cover"
                            />
                            <TouchableOpacity style={styles.editCoverButton}>
                                <Ionicons name="camera" size={22} color={colors.textPrimary} />
                            </TouchableOpacity>

                            <View style={styles.profileImageWrapper}>
                                <TouchableOpacity
                                    style={styles.profileImageContainer}
                                    onPress={handleProfilePictureUpload}
                                >

                                    <Image
                                        source={{ uri: `${apiURL}/uploads/${userData.profile_picture}` }}
                                        style={styles.profileImage}
                                        resizeMode="cover"
                                    />

                                    {/* <View style={styles.editProfilePicButton}>
                                        <Ionicons name="camera" size={16} color={colors.textPrimary} />
                                    </View> */}
                                </TouchableOpacity>
                                <Text style={styles.changePhotoText}>Change Profile Photo</Text>
                            </View>
                        </View>

                        {/* Form Sections */}
                        <View style={styles.formSection}>
                            <Text style={styles.sectionTitle}>Venue Information</Text>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Venue Name*</Text>
                                <TextInput
                                    style={styles.input}
                                    value={venueName}
                                    onChangeText={setVenueName}
                                    placeholder="Enter venue name"
                                    placeholderTextColor="#9E9E9E"
                                    color={colors.textPrimary}
                                />
                            </View>

                            <Text style={styles.sectionTitle}>Personal Information</Text>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>First Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    placeholder="Enter first name"
                                    placeholderTextColor="#9E9E9E"
                                    color={colors.textPrimary}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Last Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={lastName}
                                    onChangeText={setLastName}
                                    placeholder="Enter last name"
                                    placeholderTextColor="#9E9E9E"
                                    color={colors.textPrimary}
                                />
                            </View>

                            {/* Location input (non-functional for now based on API) */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Location</Text>
                                <TextInput
                                    style={[styles.input, styles.disabledInput]}
                                    value="Miami, FL"
                                    editable={false}
                                    placeholder="Location"
                                    placeholderTextColor="#9E9E9E"
                                    color={colors.textSecondary}
                                />
                                <Text style={styles.helperText}>Contact support to update location</Text>
                            </View>

                            {/* Email input (non-functional for now based on API) */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Email</Text>
                                <TextInput
                                    style={[styles.input, styles.disabledInput]}
                                    editable={false}
                                    placeholder="Email"
                                    placeholderTextColor="#9E9E9E"
                                    color={colors.textSecondary}
                                />
                                <Text style={styles.helperText}>Contact support to update email</Text>
                            </View>

                            {/* Website input (non-functional for now based on API) */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Website</Text>
                                <TextInput
                                    style={[styles.input, styles.disabledInput]}
                                    value="www.zeus-club.com"
                                    editable={false}
                                    placeholder="Website"
                                    placeholderTextColor="#9E9E9E"
                                    color={colors.textSecondary}
                                />
                                <Text style={styles.helperText}>Contact support to update website</Text>
                            </View>

                            {/* Required fields note */}
                            <Text style={styles.requiredNote}>* Required fields</Text>
                        </View>

                        {/* Update Button */}
                        <TouchableOpacity
                            style={styles.updateButton}
                            onPress={handleUpdateProfile}
                            disabled={updating}
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
                                    <Text style={styles.updateButtonText}>Update Profile</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>

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
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: Platform.OS === 'ios' ? 10 : 0,
    },
    headerTitle: {
        color: colors.textPrimary,
        fontSize: 18,
        fontWeight: '600',
    },
    backButton: {
        padding: 5,
    },
    placeholderView: {
        width: 24, // Same width as back button for balanced header
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    // Cover Photo and Profile Image Styles
    coverContainer: {
        position: 'relative',
        height: 130,
        marginBottom: 60, // Increased to accommodate "Change Profile Photo" text
    },
    coverPhoto: {
        width: '100%',
        height: '100%',
    },
    editCoverButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImageWrapper: {
        position: 'absolute',
        bottom: -50, // Adjusted to accommodate text
        width: '100%',
        alignItems: 'center',
    },
    profileImageContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.accent,
        overflow: 'hidden',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    profilePlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    editProfilePicButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.accent,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000',
    },
    changePhotoText: {
        color: colors.accent,
        marginTop: 8,
        fontSize: 14,
        fontWeight: '500',
    },
    // Form Section Styles
    formSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        color: colors.textPrimary,
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 15,
        marginTop: 15,
    },
    inputContainer: {
        marginBottom: 15,
    },
    inputLabel: {
        color: colors.textSecondary,
        fontSize: 14,
        marginBottom: 8,
        paddingLeft: 5,
    },
    input: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 20,
        color: colors.textPrimary,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    disabledInput: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    helperText: {
        color: colors.textTertiary,
        fontSize: 12,
        marginTop: 5,
        paddingLeft: 5,
        fontStyle: 'italic',
    },
    requiredNote: {
        color: colors.textTertiary,
        fontSize: 12,
        marginTop: 10,
        fontStyle: 'italic',
    },
    // Update Button Styles
    updateButton: {
        marginHorizontal: 20,
        borderRadius: 25,
        overflow: 'hidden',
        marginTop: 10,
        elevation: 3,
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    updateButtonGradient: {
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    updateButtonText: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: '500',
    },
    errorText: {
        color: colors.textError,
        textAlign: 'center',
        marginTop: 15,
        marginHorizontal: 20,
    },
});

export default EditVenueProfileScreen;