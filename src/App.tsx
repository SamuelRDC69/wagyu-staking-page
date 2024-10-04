import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import wharfLogo from './assets/wharf.svg';
import './App.css';
import { Chains, Session, SessionKit } from '@wharfkit/session';
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor';
import WebRenderer from '@wharfkit/web-renderer';
import Leaderboard from './Leaderboard/Leaderboard';  // No props needed
import React from 'react';

// Initialize sessionKit with wharfkit
const sessionKit = new SessionKit({
  appName: 'demo',
  chains: [Chains.Jungle4],
  ui: new WebRenderer(),
  walletPlugins: [new WalletPluginAnchor()],
});

function App() {
  const [session, setSession] = useState<Session | undefined>(undefined);

  useEffect(() => {
    sessionKit.restore().then((restored) => setSession(restored));
  }, []);

  async function login() {
    const response = await sessionKit.login();
    setSession(response.session);
  }

  async function logout() {
    sessionKit.logout(session);
    setSession(undefined);
  }

  async function transact() {
    if (!session) {
      throw new Error('Cannot transact without a session.');
    }
    const action = {
      account: 'eosio.token',
      name: 'transfer',
      authorization: [session.permissionLevel],
      data: {
        from: session.actor,
        to: 'teamgreymass',
        quantity: '0.0001 EOS',
        memo: 'Yay WharfKit! Thank you <3',
      },
    };
    session.transact({ action }, { broadcast: false }).catch((e) => {
      console.log('error caught in transact', e);
    });
  }

  return (
    <Router>
      <div className="App">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <a href="https://wharfkit.com" target="_blank">
            <img src={wharfLogo} className="logo wharf" alt="Wharf logo" />
          </a>
        </div>
        <h1>Vite + React + Wharf</h1>
        <div className="card">
          {!session ? (
            <button className="primary" onClick={login}>
              Login
            </button>
          ) : (
            <>
              <p>{String(session.actor)}</p>
              <button className="primary" onClick={transact}>
                Test Transaction (No Broadcast)
              </button>
              <button onClick={logout}> Logout </button>
            </>
          )}
          <p>Edit <code>src/App.tsx</code> and save to test HMR</p>
        </div>
        <p className="read-the-docs">
          Click on the Vite, React, and Wharf logos to learn more
        </p>
        {/* Button to go to Leaderboard */}
        <Link to="/leaderboard">
          <button className="primary">Go to Leaderboard</button>
        </Link>
      </div>

      {/* Routes setup */}
      <Routes>
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
