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

  // Set up axios default headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

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
      const res = await axios.get('http://localhost:5000/api/auth/me');
      setUser(res.data.user);
    } catch (error) {
      console.error('Error getting user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      const { token: newToken, user: newUser } = res.data;
      
      setToken(newToken);
      setUser(newUser);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  // Login function
  const login = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token: newToken, user: newUser } = res.data;
      
      setToken(newToken);
      setUser(newUser);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  // Value object to provide to consumers
  const value = {
    user,
    token,
    register,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};