// auth.js

export const verifyEmail = async (token) => {
  try {
    const response = await api.get(`/auth/verify/${token}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const requestPasswordReset = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const resetPassword = async (token, password) => {
  try {
    const response = await api.post(`/auth/reset-password/${token}`, { password });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const logout = () => {
  setAuthToken(null);
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


// authContext.js
const registerInfluencer = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/register/influencer`, userData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };
const registerVenue = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/register/venue`, userData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };
const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      const { token, user } = response.data;
      
      // Save auth data
    //   await AsyncStorage.setItem('authToken', token);
    //   await AsyncStorage.setItem('user', JSON.stringify(user));
      
      // Update state
      setToken(token);
      setUser(user);
      
      // Set token in axios defaults for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };
const logout = async () => {
    try {
      // Remove auth data from storage
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
      
      // Reset state
      setToken(null);
      setUser(null);
      
      // Remove Authorization header
      delete axios.defaults.headers.common['Authorization'];
    } catch (err) {
      console.error('Logout error', err);
    }
  };
const getCurrentUser = async () => {
    if (!token) return null;
    
    try {
      const response = await axios.get(`${API_URL}/api/users/me`);
      const userData = response.data;
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (err) {
      console.error('Failed to get current user', err);
      if (err.response?.status === 401) {
        // Token expired or invalid, logout user
        await logout();
      }
      return null;
    }
  };  
const hasRole = (requiredRole) => {
    return user && user.role === requiredRole;
  };  
const hasAnyRole = (requiredRoles) => {
    return user && requiredRoles.includes(user.role);
  };  
const updateProfile = async (profileData) => {
    if (!token) throw new Error('Authentication required');
    
    try {
      const response = await axios.put(`${API_URL}/api/users/profile`, profileData);
      const updatedUser = response.data;
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
      throw err;
    }
  };
const requestPasswordReset = async (email) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/reset-password`, { email });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to request password reset');
      throw err;
    }
  };
const resetPassword = async (token, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/reset-password/${token}`, { 
        password: newPassword 
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
      throw err;
    }
  };