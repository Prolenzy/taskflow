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

  // Enhanced register function
  const register = async (formData) => {
    try {
      setError(null);
      const res = await axios.post('/api/auth/register', formData);
      const { token: newToken, user: newUser } = res.data;
      
      setToken(newToken);
      setUser(newUser);
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || error.response?.data?.message || 'Registration failed';
      setError(message);
      return { 
        success: false, 
        message 
      };
    }
  };

  // Login function
  const login = async (formData) => {
    try {
      setError(null);
      const res = await axios.post('/api/auth/login', formData);
      const { token: newToken, user: newUser } = res.data;
      
      setToken(newToken);
      setUser(newUser);
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || error.response?.data?.message || 'Login failed';
      setError(message);
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