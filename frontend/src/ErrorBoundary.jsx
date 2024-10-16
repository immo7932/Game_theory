// src/ErrorBoundary.jsx

import React from 'react';
import { Box, Text } from "@chakra-ui/react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("Error Boundary Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Box p={4} textAlign="center">
          <Text fontSize="xl" color="red.500">Something went wrong.</Text>
        </Box>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
