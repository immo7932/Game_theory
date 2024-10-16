// src/Component/Login.jsx

import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
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
} from "@chakra-ui/react";
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      const res = await fetch('https://game-theory-7pdf.onrender.com/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        if (data.token && data.user) {
          setFormData({ email: '', password: '' });
          login(data.token, data.user);
          navigate('/schedule');
        } else {
          setMessage('Invalid response from server.');
          console.error("Login response missing token or user:", data);
        }
      } else {
        setMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <Box className="login-container">
      <Box className="login-form">
        <Heading mb={6} textAlign="center">Login</Heading>
        <VStack spacing={4} align="stretch">
          {message && (
            <Alert status="error">
              <AlertIcon />
              {message}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
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
              <Button
                type="submit"
                className="submit-btn"
                isLoading={loading}
                loadingText="Logging in"
              >
                Login
              </Button>
            </VStack>
          </form>
          <Text textAlign="center">OR</Text>
          <Button
            className="go-to-register-btn"
            onClick={goToRegister}
          >
            Register
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
