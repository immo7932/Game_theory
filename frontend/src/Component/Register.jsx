// src/Component/Register.jsx

import { useState, useContext } from "react";
import { AuthContext } from '../AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  Text,
  Select, // Imported Select
} from "@chakra-ui/react";
import './Register.css';  // Import the custom CSS

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Destructure login function
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",  // Default value
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("http://localhost:4000/api/user/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();

      if (res.ok && data.success) {
        if (data.token && data.user) {
          setFormData({
            name: "",
            email: "",
            password: "",
            role: "customer",
          });
          login(data.token, data.user); // Update auth context
          navigate('/schedule'); // Redirect to ScheduleGrid
        } else {
          setMessage('Invalid response from server.');
          console.error("Register response missing token or user:", data);
        }
      } else {
        setMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  // Function to navigate to login page
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <Box className="register-container">
      <Box className="register-form">
        <Heading mb={6} textAlign="center">Register</Heading>
        <VStack spacing={4} align="stretch">
          {message && (
            <Alert status="error">
              <AlertIcon />
              {message}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="name" isRequired className="form-group">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormControl id="email" isRequired className="form-group">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </FormControl>
              <FormControl id="password" isRequired className="form-group">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  minLength="8"
                />
              </FormControl>
              <FormControl id="role" isRequired className="form-group">
                <FormLabel>Role</FormLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Select role"
                >
                  <option value="customer">Customer</option>
                  <option value="manager">Manager</option>
                </Select>
              </FormControl>
              <Button
                type="submit"
                className="submit-btn"
                isLoading={loading}
                loadingText="Registering"
              >
                Sign Up
              </Button>
            </VStack>
          </form>
          <Text textAlign="center">OR</Text>
          <Button
            className="go-to-login-btn"
            onClick={goToLogin}
          >
            Login
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Register;
