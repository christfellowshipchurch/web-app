import React from 'react';
import Router from './components/Router/index';

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SEO from './seo';

const App = () => {
  window.scrollTo(0, 0)

  return (
    <div className="App">
      <SEO />

      <Navbar />

      <div className="App-body mt-5">
        <Router />
      </div>

      <Footer />
    </div>
  )
}

export default App;
