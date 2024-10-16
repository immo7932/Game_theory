import React from 'react';
import { VStack, Box, Text, Link } from "@chakra-ui/react";

const Sidebar = () => {
  return (
    <Box 
      bg="gray.800" 
      color="white" 
      width="250px" 
      minHeight="100vh" 
      p="20px"
      position="fixed"
    >
      <Text fontSize="2xl" mb="6">NEXUS</Text>
      <VStack align="flex-start" spacing="5">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/schedule">Schedule</Link>
        <Link href="/customers">Customers</Link>
        <Link href="/coaching">Coachings</Link>
        <Link href="/attendance">Attendance</Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
