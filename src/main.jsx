import React from 'react';
import ReactDOM from 'react-dom/client';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Auth0Provider } from '@auth0/auth0-react';
import '@fontsource/playfair-display';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/400-italic.css';
import App from './App';
import './indexApp.css';

const queryClient = new QueryClient();

const { VITE_REACT_APP_AUTH0_DOMAIN } = import.meta.env;
const { VITE_REACT_APP_AUTH0_CLIENT_ID } = import.meta.env;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={VITE_REACT_APP_AUTH0_DOMAIN}
      clientId={VITE_REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <FluentProvider theme={teamsLightTheme}>
          <App />
        </FluentProvider>
      </QueryClientProvider>
    </Auth0Provider>
  </React.StrictMode>
);
