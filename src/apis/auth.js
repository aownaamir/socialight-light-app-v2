// auth.js
import API_URL from "./apiURL"
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

export const loginApi = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });

    if (response.data && response.data.res && response.data.res.token) {
      setAuthToken(response.data.res.token);
    }
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const signupInfluencerApi = async (userData, profileFormData, photosFormData) => {
  // console.log("form data: ", photosFormData)
  try {
    const responseFile = await apiFile.post('/upload', profileFormData);
    const profilePicFilename = responseFile.data.file.filename;

    const responseMultipleFile = await apiFile.post('/upload-multiple', photosFormData);
    const professionalPhotoFilenames = responseMultipleFile.data.files.map(file => file.filename);

    userData.profilePicture = profilePicFilename;
    userData.professionalPhotos = professionalPhotoFilenames;

    const response = await api.post('/auth/register/influencer', userData);
    return response.data;

  } catch (error) {
    throw handleApiError(error);
  }
};

export const signupVenueApi = async (venueData, formData) => {
  try {

    const responseFile = await apiFile.post('/upload', formData);
    const savedFilename = responseFile.data.file.filename;
    console.log('new file name: ', savedFilename)
    venueData.profilePicture = savedFilename;
    const response = await api.post('/auth/register/venue', venueData);
    console.log('File upload response:', responseFile.data);

    return response.data;

  } catch (error) {
    console.error('API Error:', error);
    throw handleApiError(error);
  }
};

export const logoutApi = () => {
  setAuthToken(null);
  // isAithenticated=false
};

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

export default {
  loginApi,
  signupInfluencerApi,
  signupVenueApi,
  logoutApi,
  setAuthToken
};