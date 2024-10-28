// src/components/AuthButtons.tsx
import { Button, VStack } from '@chakra-ui/react';

interface AuthButtonsProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isAuthenticated, login, logout, isLoading }) => {
  return (
    <VStack spacing={4} width="100%">
      {!isAuthenticated ? (
        <Button colorScheme="blue" variant="solid" size="lg" onClick={login} isLoading={isLoading} _hover={{ bg: 'blue.600' }}>
          Connect Wallet
        </Button>
      ) : (
        <Button colorScheme="gray" variant="outline" size="lg" onClick={logout} isLoading={isLoading} _hover={{ borderColor: 'gray.500' }}>
          Logout
        </Button>
      )}
    </VStack>
  );
};

export default AuthButtons;
