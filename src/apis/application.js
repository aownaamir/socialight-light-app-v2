
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

export const applyToEventApi = async (token, eventId, influencerId) => {
  setAuthToken(token);
  try {
    const response = await api.post('/application', { eventId, influencerId });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getEventApplicationsApi = async (token, eventId) => {
  setAuthToken(token);
  try {
    const response = await api.get(`/events/${eventId}/applications`);

    const transformedApplications = response.data.applications.map(app => ({
      id: app._id,
      eventId: app.event,
      influencer: {
        id: app.influencer._id,
        name: app.influencer.email.split('@')[0], // Using email as name since name is missing
        username: `@${app.influencer.social_links.instagram}`,
        followers: '0K', // This info is not provided in the API response
        imageUrl: app.influencer.professional_photos[0] || 'placeholder'
      },
      status: app.status
    }));
    return transformedApplications;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const updateApplicationStatusApi = async (token, applicationId, status) => {
  setAuthToken(token);
  try {
    const response = await api.put(`/application/${applicationId}`, { status });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const getApplicationStatusApi = async (token, influencerId, eventId) => {
  setAuthToken(token);
  try {
    // From Image 4, we see that the controller expects influencerId and eventId as query parameters
    const response = await api.get('/applications/status', {
      params: { influencerId, eventId }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};


// Check if user has applied to an event
export const checkApplicationStatusApi = async (token, eventId) => {
  setAuthToken(token);
  try {
    // This uses the same endpoint as getApplicationStatusApi but doesn't require influencerId
    // as the backend will use the authenticated user's ID
    const response = await api.get('/applications/status', {
      params: { eventId }
    });
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
  applyToEventApi,
  getEventApplicationsApi,
  updateApplicationStatusApi,
  getApplicationStatusApi,
  checkApplicationStatusApi,
  setAuthToken
};