
import { formatDate } from "../lib/helpers";
import { useAuth } from "../store/context/authContext";
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

export const createEventApi = async (token, eventData, formData) => {

  setAuthToken(token);
  try {
    const responseMultipleFile = await apiFile.post('/upload-multiple', formData);
    const eventPhotoFilenames = responseMultipleFile.data.files.map(file => file.filename);
    eventData.eventPhotos = eventPhotoFilenames;

    const response = await api.post('/events', eventData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const getEventsApi = async (token, filters) => {
  try {
    setAuthToken(token);
    const response = await api.get(`/events${filters.search ? `?search=${filters.search}` : ''}`)
    console.log(`/events${filters.search ? `?search=${filters.search}` : ''}`)

    response.data.events.map((event) => {
      const newDate = formatDate(event.date.toString())
      event.date = newDate
      return event
    })

    return response.data;

  } catch (error) {
    throw handleApiError(error);
  }
};


export const getVenueEventsApi = async (token) => {
  try {
    setAuthToken(token)
    const response = await api.get('/events/my');

    response.data.events.map((event) => {
      const newDate = formatDate(event.date.toString())
      event.date = newDate
      return event
    })

    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const getEventApplicationsApi = async (eventId) => {
  try {
    const response = await api.get(`events/${eventId}/applications`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const getEventByIdApi = async (token, eventId) => {
  setAuthToken(token);
  try {
    const response = await api.get(`events/${eventId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const updateEventApi = async (token, eventId, eventData, formData) => {
  try {
    setAuthToken(token);
    const responseMultipleFile = await apiFile.post('/upload-multiple', formData);
    const eventPhotoFilenames = responseMultipleFile.data.files.map(file => file.filename);
    eventData.eventPhotos = eventPhotoFilenames;
    const response = await api.put(`events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
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
  createEventApi,
  getEventsApi,
  getVenueEventsApi,
  getEventApplicationsApi,
  getEventByIdApi,
  updateEventApi,
  setAuthToken
};