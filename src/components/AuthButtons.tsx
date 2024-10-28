// src/components/AuthButtons.tsx
import { Button } from '@chakra-ui/react';

interface AuthButtonsProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isAuthenticated, login, logout, isLoading }) => {
  return !isAuthenticated ? (
    <Button colorScheme="blue" onClick={login} isLoading={isLoading}>
      Connect Wallet
    </Button>
  ) : (
    <Button colorScheme="gray" onClick={logout} isLoading={isLoading}>
      Logout
    </Button>
  );
};

export default AuthButtons;
