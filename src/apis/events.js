// events.js
import { useAuth } from "../store/context/authContext";
import API_URL from "./apiURL";
import axios from "axios";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// This ensures the auth token is applied to all requests from this file too
// You can import setAuthToken from auth.js if needed
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Create a new event - for venues only
export const createEventApi = async (eventData, token) => {

  setAuthToken(token);
  try {
    const response = await api.post('/events', eventData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Get all events (public)
export const getEventsApi = async (token, filters = {}) => {
  try {
    // console.log('reached here')
    // You might want to add query parameters for filtering
    setAuthToken(token);
    const response = await api.get('/events');
    // console.log('reached here2')
    // console.log('response',await response.data)

    return response.data;

  } catch (error) {
    throw handleApiError(error);
  }
};

// Get venue's own events - for venues only
export const getVenueEventsApi = async (token) => {
  try {
    setAuthToken(token)
    const response = await api.get('/events/my');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Get applications for a specific event - for venues only
export const getEventApplicationsApi = async (eventId) => {
  try {
    const response = await api.get(`events/${eventId}/applications`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Get a specific event by ID
export const getEventByIdApi = async (token, eventId) => {
  // console.log('eventId', eventId)
  setAuthToken(token);
  try {
    const response = await api.get(`events/${eventId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Update a specific event - for venues only
export const updateEventApi = async (token, eventId, eventData) => {
  try {
    setAuthToken(token);
    console.log('till here')
    const response = await api.put(`events/${eventId}`, eventData);
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

export default {
  createEventApi,
  getEventsApi,
  getVenueEventsApi,
  getEventApplicationsApi,
  getEventByIdApi,
  updateEventApi,
  setAuthToken
};