// AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { loginApi } from '../../apis/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the auth context
const AuthContext = createContext();

// API URL - replace with your actual backend URL
const API_URL = 'http://192.168.10.3:8080';

const dummyUserInfluencer = {
  "email": "khan33@gmail.com",
  "phone_number": "3218424803",
  "first_name": "Khan",
  "last_name": "Khan",
  "profile_picture": "123",
  "password": "$2b$10$xQYUHSFqeJM4zNmksz7theLq7t.mYa30ruIT3T1aa7ctBWxu6tdFu",
  "role": "influencer",
  "is_verified": true,
  "professional_photos": [
    "123",
    "123",
    "123"
  ],
  "followers": 0,
  "likes": 0,
  "social_links": {
    "instagram": "jpqwojcpioq",
    "facebook": "",
    "tiktok": "",
    "youtube": ""
  },
  "event_count": 0,
  "average_rating": 0,
  "rating_count": 0,
  "createdAt": {
    "$date": "2025-04-06T12:05:57.871Z"
  },
  "updatedAt": {
    "$date": "2025-04-06T12:05:57.871Z"
  }
}
const dummyUserVenue = {
  "_id": {
    "$oid": "67e2f7d684e49109dcb232d2"
  },
  "email": "ven1@yopmail.com",
  "phone_number": "0333930399",
  "first_name": "KKVEnue",
  "last_name": "Khan",
  "profile_picture": "profile",
  "password": "$2b$10$3oazGxyBqNJnCJyQDMnmIup/9Vdma/pYwxsul.NNcvBwXcwG5GFmq",
  "role": "venue",
  "is_verified": true,
  "venue_name": "superPlace",
  "is_subscribed": false,
  "event_limit": 9,
  "createdAt": {
    "$date": "2025-03-25T18:37:10.934Z"
  },
  "updatedAt": {
    "$date": "2025-03-27T13:29:28.484Z"
  },
  "__v": 0,
  "customer_id": "cus_S1J74ipNTlymJB"
}


{/* set auth user null */ }
{/* is user is dummy influencer then render only influencerNavigator */ }
{/* is user is dummy venue then render only venueNavigator */ }
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Initialize auth state by checking for saved token
  //   useEffect(() => {
  //     const loadStoredAuth = async () => {
  //       try {
  //         const storedToken = await AsyncStorage.getItem('authToken');
  //         const storedUser = await AsyncStorage.getItem('user');

  //         if (storedToken && storedUser) {
  //           setToken(storedToken);
  //           setUser(JSON.parse(storedUser));
  //           axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
  //         }
  //       } catch (err) {
  //         console.error('Failed to load authentication data', err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     loadStoredAuth();
  //   }, []);


  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const userData = await loginApi(email, password)
      // console.log('user: ', userData)

      // Store user data and token in state
      setUser(userData.res.user);
      setToken(userData.res.token);
      setIsAuthenticated(true);

      // Store in AsyncStorage
      // try {
      //     await AsyncStorage.setItem('authToken', userData.res.token);
      //     await AsyncStorage.setItem('refreshToken', userData.res.refreshToken);
      //     await AsyncStorage.setItem('user', JSON.stringify(userData.res.user));
      // } catch (err) {
      //     console.error('Failed to save auth data to storage', err);
      // }

      return userData;
    } catch (err) {
      setError(err.message || 'Authentication failed');
      throw err;
    } finally {
      setLoading(false);
    }

  };

  const logoutAuth = () => {
    setIsAuthenticated(false);
  }
  ///////////////////////////////////////
  //   extra code
  ///////////////////////////////////////


  // Context value
  const authContextValue = {
    user,
    login,
    token,
    loading,
    error,
    isAuthenticated,
    logoutAuth,
    // login,
    // logout,
    // getCurrentUser,
    // hasRole,
    // hasAnyRole,
    // updateProfile,
    // requestPasswordReset,
    // resetPassword,
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};