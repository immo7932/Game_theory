// src/Component/Home.jsx

import React from 'react';
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';
import ScheduleGrid from './ScheduleGrid.jsx';

const Home = () => {
  return (
    <Flex height="100vh">
      <Sidebar />
      <Box flex="1">
        <Navbar />
        <Box p={4}>
          <ScheduleGrid />
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
