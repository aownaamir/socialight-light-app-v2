// auth.js
import API_URL from "./apiURL"
import axios from "axios";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
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
        // console.log('response is this: ',await response.data)
        return response.data; // Return the data instead of the whole response
    } catch (error) {
        throw handleApiError(error);
    }
};

export const signupInfluencerApi = async (userData, formData) => {
  try {
    // console.log('userData:', userData)
    const response = await api.post('/auth/register/influencer', userData);
    return response.data;

    //saparate api call for files
  } catch (error) {
    throw handleApiError(error);
  }
};

export const signupVenueApi = async (venueData ,formData) => {


  try {
    const response = await api.post('/auth/register/venue', venueData);
    return response.data;
  } catch (error) {
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

// export const verifyEmail = async (token) => {
//   try {
//     const response = await api.get(`/auth/verify/${token}`);
//     return response.data;
//   } catch (error) {
//     throw handleApiError(error);
//   }
// };
// export const requestPasswordReset = async (email) => {
//   try {
//     const response = await api.post('/auth/forgot-password', { email });
//     return response.data;
//   } catch (error) {
//     throw handleApiError(error);
//   }
// };
// export const resetPassword = async (token, password) => {
//   try {
//     const response = await api.post(`/auth/reset-password/${token}`, { password });
//     return response.data;
//   } catch (error) {
//     throw handleApiError(error);
//   }
// };
// export const getCurrentUser = async () => {
//   try {
//     const response = await api.get('/auth/me');
//     return response.data;
//   } catch (error) {
//     throw handleApiError(error);
//   }
// };
// const handleApiError = (error) => {
//   const message = 
//     error.response?.data?.message ||
//     error.message ||
//     'Something went wrong';
    
//   return {
//     message,
//     status: error.response?.status,
//     data: error.response?.data
//   };
// };

export default {
  loginApi,
  signupInfluencerApi,
  signupVenueApi,
//   verifyEmail,
//   requestPasswordReset,
//   resetPassword,
//   getCurrentUser,
  logoutApi,
  setAuthToken
};