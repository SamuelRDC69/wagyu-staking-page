import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react'; // For Chakra UI
import { BrowserRouter } from 'react-router-dom';  // For routing

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* Enables routing */}
      <ChakraProvider>  {/* Wrap the app in ChakraProvider */}
        <App />  {/* Main App Component */}
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
