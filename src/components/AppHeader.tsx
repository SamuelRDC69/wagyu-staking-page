// src/components/AppHeader.tsx
import { Heading, Flex, Image } from '@chakra-ui/react';

const AppHeader = () => (
  <Flex justify="center" align="center" p={4} bg="blue.900" color="white">
    <Image src="/logo.svg" alt="App Logo" boxSize="40px" mr={3} />
    <Heading as="h1" size="lg" textAlign="center">
      Token Staking DApp
    </Heading>
  </Flex>
);

export default AppHeader;
