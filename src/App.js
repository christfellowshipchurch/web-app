import React from 'react';
import ApollosConfig from '@apollosproject/config';

import Router from './router';
import Footer from './footer';
import SEO from './seo';
import Navbar, { NavbarWithOpacity } from './navbar';
import LogIn from './login';

import { useAuth } from './auth';

const opaqueNavbarPages = ['', '/', '/animations'];

console.log({ ApollosConfig });

const App = () => {
  const { triggerLogIn } = useAuth();
  const page = window.location.pathname;

  window.scrollTo(0, 0);

  return (
    <div>
      <SEO />

      {opaqueNavbarPages.includes(page)
        ? <NavbarWithOpacity offset={50} />
        : <Navbar />}

      <div className="mt-0">
        <Router />
      </div>

      {triggerLogIn && <LogIn />}

      <Footer />
    </div>
  );
};

export default App;
