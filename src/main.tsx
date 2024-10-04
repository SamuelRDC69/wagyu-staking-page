import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react'; // Import ChakraProvider for Chakra UI

// Initialize the React root element
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Render the app, wrapped with ChakraProvider for Chakra UI support
root.render(
  <React.StrictMode>
    <ChakraProvider> {/* Wrap the app with ChakraProvider to apply Chakra UI theming */}
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
