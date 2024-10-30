// src/App.tsx
import React, { useEffect, useContext } from 'react';
import { SessionKit } from '@wharfkit/session';
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor';
import WebRenderer from '@wharfkit/web-renderer';
import { useToast, Box, VStack, Container } from '@chakra-ui/react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import AppHeader from './components/AppHeader';
import AuthButtons from './components/AuthButtons';
import Dashboard from './components/Dashboard/Dashboard';
import UniverseSelector from './components/Navigation/UniverseSelector';
import PoolSelector from './components/Navigation/PoolSelector';
import GuildList from './components/Guilds/GuildList';
import GuildDetails from './components/Guilds/GuildDetails';
import EventList from './components/Events/EventList';
import EventDetails from './components/Events/EventDetails';
import { UserContext } from './contexts/UserContext';

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
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('UserContext not found');
  }

  const { session, setSession } = userContext;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    sessionKit.restore().then((restoredSession) => {
      if (restoredSession) {
        setSession(restoredSession);
      }
    });
  }, [setSession]);

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
          {session && (
            <Switch>
              <Route exact path="/">
                <UniverseSelector />
                <PoolSelector />
                <Dashboard />
              </Route>
              <Route exact path="/guilds">
                <GuildList />
              </Route>
              <Route path="/guilds/:guildId">
                <GuildDetails />
              </Route>
              <Route exact path="/events">
                <EventList />
              </Route>
              <Route path="/events/:eventId">
                <EventDetails />
              </Route>
            </Switch>
          )}
        </VStack>
      </Box>
    </Container>
  );
}

export default App;
