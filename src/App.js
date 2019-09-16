import React from 'react'
import Router from './components/Router/index'
import Footer from './components/Footer'
import SEO from './seo'
import Navbar, { NavbarWithOpacity } from './components/Navbar'

const App = () => {
  const page = window.location.pathname

  window.scrollTo(0, 0)

  return (
    <div>
      <SEO />

      {page === 'home-page' || page === '/home-page'
        ? <NavbarWithOpacity offset={250} />
        : <Navbar />
      }

      <div className="mt-0">
        <Router />
      </div>

      <Footer />
    </div>
  )
}

export default App
