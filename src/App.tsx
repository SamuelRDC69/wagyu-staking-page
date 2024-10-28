// src/App.tsx
import { useEffect, useState } from 'react';
import { Chains, Session, SessionKit } from '@wharfkit/session';
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor';
import WebRenderer from '@wharfkit/web-renderer';
import { useToast, Box, VStack, Container } from '@chakra-ui/react';
import './App.css';
import AppHeader from './components/AppHeader';
import AuthButtons from './components/AuthButtons';
import StakeControls from './components/StakeControls';
import LeaderboardButton from './components/LeaderboardButton';
import AppRoutes from './components/AppRoutes';

const sessionKit = new SessionKit({
  appName: 'Token Staking DApp',
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
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [stakedAmount, setStakedAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    sessionKit.restore().then((restored) => setSession(restored));
  }, []);

  const login = async () => {
    try {
      const response = await sessionKit.login();
      setSession(response.session);
      toast({ status: 'success', description: 'Wallet connected!' });
    } catch (e) {
      console.error('Login error: ', e);
      toast({ status: 'error', description: 'Failed to connect wallet' });
    }
  };

  const logout = async () => {
    try {
      await sessionKit.logout(session);
      setSession(undefined);
      toast({ status: 'success', description: 'Logged out successfully' });
    } catch (e) {
      console.error('Logout error: ', e);
      toast({ status: 'error', description: 'Failed to log out' });
    }
  };

  const stakeTokens = async () => { /* Staking logic */ };
  const claimRewards = async () => { /* Claiming logic */ };
  const unstakeTokens = async () => { /* Unstaking logic */ };

  return (
    <Container maxW="container.md" p={0} centerContent>
      <AppHeader />
      <Box p={6} mt={6} borderRadius="lg" boxShadow="lg" bg="white" width="100%">
        <VStack spacing={8} width="100%">
          <AuthButtons isAuthenticated={!!session} login={login} logout={logout} isLoading={isLoading} />
          {session && (
            <StakeControls
              stakedAmount={stakedAmount}
              setStakedAmount={setStakedAmount}
              stakeTokens={stakeTokens}
              claimRewards={claimRewards}
              unstakeTokens={unstakeTokens}
              isLoading={isLoading}
            />
          )}
          <LeaderboardButton />
        </VStack>
      </Box>
      <AppRoutes />
    </Container>
  );
}

export default App;
