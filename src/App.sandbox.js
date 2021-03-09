import React from 'react';

import Router from './router';
import Footer from './footer';
import Metadata from './metadata';
import Navbar from './navbar';
import NavbarWithOpacity from './navbar/NavbarWithOpacity';
import LogIn from './login';

import { useAuth } from './auth';

import { load as loadIntercom, boot as bootIntercom } from './intercom';

const App = () => {
  const { triggerLogIn, isLoggedIn } = useAuth();
  const page = window.location.pathname;

  const opaqueNavbarPages = ['/', '/home-page'];

  //initialize Intercom
  loadIntercom();
  bootIntercom();

  return (
    <>
      <Metadata />

      {!isLoggedIn && opaqueNavbarPages.includes(page) ? (
        <NavbarWithOpacity />
      ) : (
        <Navbar />
      )}

      <div className="mt-0">
        <Router />
      </div>

      {triggerLogIn && <LogIn />}
      <Footer />
    </>
  );
};

export default App;
