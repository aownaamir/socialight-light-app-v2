import API_URL from "./apiURL";
import axios from "axios";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
const apiFile = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});


export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

// Get current user profile
export const getCurrentUserApi = async (token) => {
    setAuthToken(token);
    // console.log('here')
    try {
        const response = await api.get('/users/me');
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const updateInfluencerProfileApi = async (token, userData, profileFormData, photosFormData) => {
    setAuthToken(token);
    try {
        // console.log('profileFormData: ', profileFormData._parts)
        // if (!profileFormData._parts.length !== 0) {
        const responseFile = await apiFile.post('/upload', profileFormData);
        const profilePicFilename = responseFile.data.file.filename;
        console.log(photosFormData._parts)

        const responseMultipleFile = await apiFile.post('/upload-multiple', photosFormData);
        const professionalPhotoFilenames = responseMultipleFile.data.files.map(file => file.filename);
        console.log(professionalPhotoFilenames)

        userData.profile_picture = profilePicFilename;
        userData.professional_photos = professionalPhotoFilenames;

        // console.log('new file name: ', savedFilename)
        // }
        const response = await api.put('/users/influencer', userData);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

// const responseFile = await apiFile.post('/upload', profileFormData);
// const profilePicFilename = responseFile.data.file.filename;

// const responseMultipleFile = await apiFile.post('/upload-multiple', photosFormData);
// const professionalPhotoFilenames = responseMultipleFile.data.files.map(file => file.filename);

// userData.profilePicture = profilePicFilename;
// userData.professionalPhotos = professionalPhotoFilenames;

// Update venue profile

export const updateVenueProfileApi = async (token, profileData, formData) => {
    setAuthToken(token);
    try {
        // console.log('formData: ', formData._parts)
        if (formData._parts.length !== 0) {
            const responseFile = await apiFile.post('/upload', formData);
            const savedFilename = responseFile.data.file.filename;
            console.log('new file name: ', savedFilename)
            profileData.profile_picture = savedFilename;
        }
        const response = await api.put('/users/venue', profileData);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};



// Helper function to handle API errors consistently
const handleApiError = (error) => {
    const message =
        error.response?.data?.message ||
        error.message ||
        'Something went wrong';

    return {
        message,
        status: error.response?.status,
        data: error.response?.data
    };
};

// Generic update profile function that calls the appropriate API based on user role
// export const updateUserProfileApi = async (token, profileData, userRole) => {
//     if (userRole === 'influencer') {
//         return updateInfluencerProfileApi(token, profileData);
//     } else if (userRole === 'venue') {
//         return updateVenueProfileApi(token, profileData);
//     } else {
//         throw new Error('Invalid user role');
//     }
// };

export default {
    getCurrentUserApi,
    updateInfluencerProfileApi,
    updateVenueProfileApi,
    // updateUserProfileApi,
    setAuthToken
};