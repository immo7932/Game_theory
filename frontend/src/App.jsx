// src/App.js

import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import Register from './Component/Register';
import Login from './Component/Login';
import ScheduleGrid from './Component/ScheduleGrid';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute
import { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Import AuthContext

function App() {
  const { isAuthenticated } = useContext(AuthContext); // Access authentication state

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Route */}
          <Route 
            path="/schedule" 
            element={
              <PrivateRoute>
                <ScheduleGrid />
              </PrivateRoute>
            } 
          />

          {/* Redirect Root Path */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? <Navigate to="/schedule" replace /> : <Navigate to="/login" replace />
            } 
          />

          {/* Handle Unknown Routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
