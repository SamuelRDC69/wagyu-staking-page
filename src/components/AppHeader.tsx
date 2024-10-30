// src/components/AppHeader.tsx
import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const AppHeader: React.FC = () => {
  return (
    <Box as="header" width="100%" py={4} bg="teal.500" color="white" textAlign="center">
      <Heading as="h1" size="lg">
        Clash of Stakes
      </Heading>
    </Box>
  );
};

export default AppHeader;
