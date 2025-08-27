import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState(null);

  // Get API URL from environment variable
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Set up axios default headers and base URL
  useEffect(() => {
    // Set base URL for all axios requests
    axios.defaults.baseURL = API_URL;
    
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token, API_URL]);

  // Check if user is logged in on app load
  useEffect(() => {
    if (token) {
      getUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Function to get user data
  const getUser = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      setUser(res.data.user);
    } catch (error) {
      console.error('Error getting user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Enhanced register function with better error handling
  const register = async (formData) => {
    try {
      setError(null);
      setLoading(true);
      
      // Log the API URL and request data for debugging
      console.log('Making request to:', `${API_URL}/api/auth/register`);
      console.log('Request data:', formData);
      
      const res = await axios.post('/api/auth/register', formData);
      const { token: newToken, user: newUser } = res.data;
      
      setToken(newToken);
      setUser(newUser);
      setLoading(false);
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      
      let message = 'Registration failed';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        
        message = error.response.data?.message || 
                 error.response.data?.error || 
                 `Server error: ${error.response.status}`;
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        message = 'No response from server. Please check if the backend is running.';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        message = error.message;
      }
      
      setError(message);
      setLoading(false);
      return { 
        success: false, 
        message 
      };
    }
  };

  // Login function with better error handling
  const login = async (formData) => {
    try {
      setError(null);
      setLoading(true);
      
      const res = await axios.post('/api/auth/login', formData);
      const { token: newToken, user: newUser } = res.data;
      
      setToken(newToken);
      setUser(newUser);
      setLoading(false);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      
      let message = 'Login failed';
      
      if (error.response) {
        message = error.response.data?.message || 
                 error.response.data?.error || 
                 `Server error: ${error.response.status}`;
      } else if (error.request) {
        message = 'No response from server. Please check if the backend is running.';
      } else {
        message = error.message;
      }
      
      setError(message);
      setLoading(false);
      return { 
        success: false, 
        message 
      };
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    setError(null);
  };

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  // Value object to provide to consumers
  const value = {
    user,
    token,
    register,
    login,
    logout,
    loading,
    error,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};