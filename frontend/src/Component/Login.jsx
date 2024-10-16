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
  useColorModeValue
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
      const res = await fetch('http://localhost:4000/api/user/login', {
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

  const boxBgColor = useColorModeValue('#34495e', 'gray.700');
  const boxShadowColor = useColorModeValue('rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.4)');

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow={`0 8px 24px ${boxShadowColor}`}
      bg={boxBgColor}
      textAlign="center"
      className="login-form"
    >
      <Heading mb={6} color="white" textAlign="center">Login</Heading>
      <VStack spacing={4} align="stretch">
        {message && (
          <Alert status="error">
            <AlertIcon />
            {message}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel color="white">Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                focusBorderColor="teal.500"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel color="white">Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                focusBorderColor="teal.500"
                minLength="8"
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              width="full"
              isLoading={loading}
              loadingText="Logging in"
              shadow="md"
            >
              Login
            </Button>
          </VStack>
        </form>
        <Text color="white">OR</Text>
        <Button
          variant="outline"
          colorScheme="teal"
          width="full"
          onClick={goToRegister}
        >
          Register
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
