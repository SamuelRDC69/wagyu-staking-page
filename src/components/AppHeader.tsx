// src/components/AppHeader.tsx
import React from 'react';
import { Box, Heading, HStack, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const AppHeader: React.FC = () => {
  return (
    <Box as="header" width="100%" py={4} bg="teal.500" color="white" textAlign="center">
      <Heading as="h1" size="lg">
        Clash of Stakes
      </Heading>
      <HStack spacing={8} justify="center" mt={4}>
        <ChakraLink as={Link} to="/" color="white" fontWeight="bold">
          Home
        </ChakraLink>
        <ChakraLink as={Link} to="/guilds" color="white" fontWeight="bold">
          Guilds
        </ChakraLink>
      </HStack>
    </Box>
  );
};

export default AppHeader;
