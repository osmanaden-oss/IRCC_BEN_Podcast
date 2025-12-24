import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AudioProvider } from './context/AudioContext';
import { SubscribeProvider } from './context/SubscribeContext';
import { LanguageProvider } from './context/LanguageContext';
import App from './App';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AudioProvider>
            <SubscribeProvider>
              <App />
            </SubscribeProvider>
          </AudioProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);
