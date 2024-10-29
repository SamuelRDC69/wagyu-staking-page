// src/components/AuthButtons.tsx
import React from 'react';
import { Button, HStack } from '@chakra-ui/react';

interface AuthButtonsProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isAuthenticated, login, logout, isLoading }) => {
  return (
    <HStack spacing={4}>
      {isAuthenticated ? (
        <Button colorScheme="red" onClick={logout} isLoading={isLoading}>
          Logout
        </Button>
      ) : (
        <Button colorScheme="teal" onClick={login} isLoading={isLoading}>
          Login with Anchor
        </Button>
      )}
    </HStack>
  );
};

export default AuthButtons;
