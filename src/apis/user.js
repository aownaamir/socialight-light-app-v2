// user.js
import API_URL from "./apiURL";
import axios from "axios";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Set auth token for requests
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

// Check if token exists and set it on app initialization


// Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        if (response.data.token) {
            setAuthToken(response.data.token);
        }
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

// Login user


// Get current user data
export const getMe = async (token) => {
    try {
        setAuthToken(token)
        const response = await api.get('/users/me');
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

// Apply to event (from router.post("/", authenticate, authorizeRole("influencer"), applyToEvent))


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

// Check if current user has the required role
export const hasRole = (user, role) => {
    return user && user.role === role;
};

// Check if the user is an influencer
export const isInfluencer = (user) => {
    return hasRole(user, "influencer");
};

// Check if the user is a venue
export const isVenue = (user) => {
    return hasRole(user, "venue");
};

export default {
    registerUser,
    setAuthToken,
    hasRole,
    isInfluencer,
    isVenue
};