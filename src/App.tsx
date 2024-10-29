// src/App.tsx
import React, { useEffect, useState } from 'react';
import { Chains, Session, SessionKit } from '@wharfkit/session';
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor';
import WebRenderer from '@wharfkit/web-renderer';
import { useToast, Box, VStack, Container } from '@chakra-ui/react';
import './App.css';

import AppHeader from './components/AppHeader';
import AuthButtons from './components/AuthButtons';
import Dashboard from './components/Dashboard/Dashboard';
import { UserProvider } from './contexts/UserContext';

const sessionKit = new SessionKit({
  appName: 'StakeQuest',
  chains: [
    {
      id: 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12',
      url: 'https://testnet.waxsweden.org',
    },
  ],
  ui: new WebRenderer(),
  walletPlugins: [new WalletPluginAnchor()],
});


function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
  sessionKit.restore()
    .then((restoredSession) => setSession(restoredSession || null))
    .catch(console.error);
}, []);



  const login = async () => {
    setIsLoading(true);
    try {
      const response = await sessionKit.login();
      setSession(response.session);
      toast({ status: 'success', description: 'Wallet connected!' });
    } catch (e) {
      console.error('Login error:', e);
      toast({ status: 'error', description: 'Failed to connect wallet' });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (session) {
        await sessionKit.logout(session);
        setSession(null);
        toast({ status: 'success', description: 'Logged out successfully' });
      }
    } catch (e) {
      console.error('Logout error:', e);
      toast({ status: 'error', description: 'Failed to log out' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserProvider value={{ session, setSession }}>
      <Container maxW="container.xl" p={0} centerContent>
        <AppHeader />
        <Box p={6} mt={6} borderRadius="lg" boxShadow="lg" bg="white" width="100%">
          <VStack spacing={8} width="100%">
            <AuthButtons
              isAuthenticated={!!session}
              login={login}
              logout={logout}
              isLoading={isLoading}
            />
            {session && <Dashboard />}
          </VStack>
        </Box>
      </Container>
    </UserProvider>
  );
}

export default App;
