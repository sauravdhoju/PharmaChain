import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';

import BackendAPIProvider from './contexts/BackendAPIContext/BackendAPIContext';
import PharmacyProvider from './contexts/PharmacyContext/PharmacyContext';

import './style.scss';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider>
                <BackendAPIProvider>
                    <PharmacyProvider>
                        <App />
                    </PharmacyProvider>
                </BackendAPIProvider>
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>
);
