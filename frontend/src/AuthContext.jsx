// src/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';

// Create the Auth Context
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Store user details if needed

  // Check for existing authentication token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    let userData = null;

    try {
      userData = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      // Optionally, you can clear the invalid data
      localStorage.removeItem('user');
      userData = null;
    }

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(userData);
    }
  }, []);

  // Function to handle login
  const login = (token, userData) => {
    if (token && userData) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
    } else {
      console.error("Invalid token or user data provided to login.");
      // Optionally, you can handle this scenario by notifying the user
    }
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
