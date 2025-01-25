import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import BackendAPIProvider from './context/BackendAPIContext/BackendAPIContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BackendAPIProvider>
            <App />
        </BackendAPIProvider>
    </StrictMode>
);
