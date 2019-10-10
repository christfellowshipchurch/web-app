import React from 'react'
import Router from './router'
import Footer from './components/Footer'
import SEO from './seo'
import Navbar, { NavbarWithOpacity } from './components/Navbar'
import LogIn from './login'

import { useAuth } from './auth'

const App = () => {
  const { triggerLogIn } = useAuth()
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

      {triggerLogIn && <LogIn />}

      <Footer />
    </div>
  )
}

export default App
