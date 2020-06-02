import React, { useState } from 'react'

import ProfilePage from '../../profile'
import FeaturesFeed from '../../features-feed';

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
        : <FeaturesFeed />
}

export default Router