import React, { useState } from 'react'

import ProfilePage from '../../profile'
import PageBuilder from '../../page-builder'

import { useAuth } from '../../auth'

const Router = () => {
    const { isLoggedIn, logIn } = useAuth()
    const [showLogIn, setShowLogIn] = useState(!isLoggedIn)

    if (showLogIn) {
        logIn()
        setShowLogIn(false)
        window.history.pushState('/', 'Christ Fellowship Church', '/')
    }

    return isLoggedIn
        ? <ProfilePage />
        : <PageBuilder
            title="home-page"
            theme="swoop"
        />
}

export default Router