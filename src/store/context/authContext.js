// AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { loginApi } from '../../apis/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the auth context
const AuthContext = createContext();

// API URL - replace with your actual backend URL
const API_URL = 'http://192.168.10.3:8080';

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

       const userData=await loginApi(email, password)
        
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