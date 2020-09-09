import 'react-app-polyfill/ie11';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components/macro';

import { theme } from 'styles/config';

import App from './App';
import * as serviceWorker from './serviceWorker';

import './styles/css/styles.css';

import { LiveProvider } from './live';
import { ClientProvider } from './client';
import { AuthProvider } from './auth';
import { SandboxProvider } from './sandbox';

ReactDOM.render(
  <ClientProvider>
    <BrowserRouter>
      <AuthProvider>
        <LiveProvider>
          <SandboxProvider>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </SandboxProvider>
        </LiveProvider>
      </AuthProvider>
    </BrowserRouter>
  </ClientProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
