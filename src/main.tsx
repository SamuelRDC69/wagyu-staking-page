import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react'; // For Chakra UI
import { BrowserRouter } from 'react-router-dom';  // For routing
import { UserProvider } from './contexts/UserContext'; // Import UserProvider
import { PoolProvider } from './contexts/PoolContext';
import { GuildProvider } from './contexts/GuildContext';


// Initialize Eruda only in development or on mobile devices
if (import.meta.env.MODE === 'development' || /Android|iPhone/i.test(navigator.userAgent)) {
  import('eruda').then((eruda) => {
    eruda.default.init(); // Use eruda.default.init() to access the init function
  });
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <UserProvider>
          <PoolProvider>
            <GuildProvider>
              <App />
            </GuildProvider>
          </PoolProvider>
        </UserProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);