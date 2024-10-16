import React from 'react';
import { Box, Flex, Input, Button, Avatar, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg="gray.100" p="4" ml="250px" position="sticky" top="0" zIndex="1">
      <Flex justifyContent="space-between" alignItems="center">
        <Input placeholder="Type a command or search..." width="300px" />
        <Flex alignItems="center">
          <Button variant="ghost">Rent & Sell</Button>
          <Button variant="solid" colorScheme="blue" ml="4">
            + New Customer
          </Button>
          <Avatar name="Tarikul" ml="4" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
