import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './styles/index.css';
import defaultTheme from './styles/theme';

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Suspense>
          <ThemeProvider theme={defaultTheme}>
            <App />
          </ThemeProvider>
        </Suspense>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
