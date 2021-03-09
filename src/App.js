import React from 'react';

import Router from './router';
import Footer from './footer';
import Metadata from './metadata';
import Navbar from './navbar';
import LogIn from './login';

import { useAuth } from './auth';

//

const App = () => {
  const { triggerLogIn } = useAuth();

  window.scrollTo(0, 0);

  return (
    <>
      <Metadata />
      <Navbar />

      <div className="mt-0">
        <Router />
      </div>

      {triggerLogIn && <LogIn />}

      <Footer />
    </>
  );
};

export default App;
