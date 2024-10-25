import { Routes, Route, useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react'; // Importing Dispatch and SetStateAction
import './App.css';
import { Chains, Session, SessionKit } from '@wharfkit/session';
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor';
import WebRenderer from '@wharfkit/web-renderer';
import Leaderboard from './Leaderboard/Leaderboard';
import React from 'react';
import { Box, Button, Input, Heading, Text, VStack, useToast } from '@chakra-ui/react'; // Chakra UI for design

// Initialize sessionKit with WharfKit
const sessionKit = new SessionKit({
  appName: 'Token Staking DApp',
  chains: [Chains.Jungle4],
  ui: new WebRenderer(),
  walletPlugins: [new WalletPluginAnchor()],
});

function App() {
  const [session, setSession] = useState<Session | undefined>(undefined); // State for managing the session
  const [stakedAmount, setStakedAmount] = useState<string>(''); // State for staked amount input
  const [isLoading, setIsLoading] = useState<boolean>(false); // State for loading status
  const navigate = useNavigate(); // Hook for navigation
  const toast = useToast(); // Chakra UI's toast for notifications

  // Restore session when app loads
  useEffect(() => {
    sessionKit.restore().then((restored) => setSession(restored));
  }, []);

  // Login function for wallet connection
  async function login() {
    try {
      const response = await sessionKit.login();
      setSession(response.session);
      toast({ status: 'success', description: 'Wallet connected!' });
    } catch (e) {
      console.error('Login error: ', e);
      toast({ status: 'error', description: 'Failed to connect wallet' });
    }
  }

  // Logout function
  async function logout() {
    try {
      await sessionKit.logout(session);
      setSession(undefined);
      toast({ status: 'success', description: 'Logged out successfully' });
    } catch (e) {
      console.error('Logout error: ', e);
      toast({ status: 'error', description: 'Failed to log out' });
    }
  }

  // Stake tokens by interacting with the smart contract
  async function stakeTokens() {
    if (!session || !stakedAmount) return;
    setIsLoading(true);

    const action = {
      account: 'eosio.token',
      name: 'transfer',
      authorization: [session.permissionLevel],
      data: {
        from: session.actor,
        to: 'your_staking_contract',  // Replace with the actual contract account name
        quantity: `${stakedAmount} TOKEN`,  // Replace TOKEN with the correct token symbol (e.g., EOS)
        memo: 'stake',
      },
    };

    try {
      await session.transact({ action });
      toast({ status: 'success', description: 'Tokens staked successfully!' });
    } catch (error) {
      console.error('Staking error:', error);
      toast({ status: 'error', description: 'Failed to stake tokens' });
    } finally {
      setIsLoading(false);
    }
  }

  // Claim rewards function by calling the 'claim' action on the smart contract
  async function claimRewards() {
    if (!session) return;
    setIsLoading(true);

    const action = {
      account: 'your_staking_contract', // Replace with actual contract
      name: 'claim',
      authorization: [session.permissionLevel],
      data: {
        claimer: session.actor,
        pool_id: 1,  // Replace with actual pool_id or logic to retrieve the pool_id
      },
    };

    try {
      await session.transact({ action });
      toast({ status: 'success', description: 'Rewards claimed successfully!' });
    } catch (error) {
      console.error('Claim error:', error);
      toast({ status: 'error', description: 'Failed to claim rewards' });
    } finally {
      setIsLoading(false);
    }
  }

  // Unstake tokens function by calling the 'unstake' action on the smart contract
  async function unstakeTokens() {
    if (!session || !stakedAmount) return;
    setIsLoading(true);

    const action = {
      account: 'your_staking_contract', // Replace with actual contract
      name: 'unstake',
      authorization: [session.permissionLevel],
      data: {
        claimer: session.actor,
        pool_id: 1,  // Replace with actual pool_id
        quantity: `${stakedAmount} TOKEN`,  // Ensure correct token symbol
      },
    };

    try {
      await session.transact({ action });
      toast({ status: 'success', description: 'Tokens unstaked successfully!' });
    } catch (error) {
      console.error('Unstaking error:', error);
      toast({ status: 'error', description: 'Failed to unstake tokens' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="App">
        <Heading as="h1" size="lg" textAlign="center" mt={8}>
          Token Staking DApp
        </Heading>

        {/* Ensure all elements are wrapped in a single parent */}
        <div className="card">
          {!session ? (
            <Button colorScheme="blue" onClick={login} isLoading={isLoading}>
              Connect Wallet
            </Button>
          ) : (
            <>
              <Text>Welcome, {session.actor ? String(session.actor) : "Unknown User"}</Text>

              <Input
                placeholder="Amount to stake"
                value={stakedAmount}
                onChange={(e) => setStakedAmount(e.target.value)}
                mb={3}
              />
              <Button colorScheme="green" onClick={stakeTokens} isLoading={isLoading}>
                Stake Tokens
              </Button>
              <Button colorScheme="orange" onClick={claimRewards} isLoading={isLoading}>
                Claim Rewards
              </Button>
              <Button colorScheme="red" onClick={unstakeTokens} isLoading={isLoading}>
                Unstake Tokens
              </Button>
              <Button colorScheme="gray" onClick={logout} isLoading={isLoading}>
                Logout
              </Button>
            </>
          )}
        </div>

        <p className="read-the-docs">
          Click on the Vite, React, and Wharf logos to learn more
        </p>

        {/* Button to navigate to Leaderboard */}
        <Button colorScheme="blue" onClick={() => navigate('/leaderboard')}>
          Go to Leaderboard
        </Button>
      </div>

      {/* Wrapping Routes in a Fragment */}
      <Routes>
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </>
  );
}

export default App;
