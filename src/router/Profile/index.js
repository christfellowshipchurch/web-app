import React, { useState } from 'react'
import { Route } from 'react-router-dom'

import ProfilePage from '../../profile'
import { default as Default } from '../../components/Page'

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
        : <Default
            title="home-page"
            match={{ params: { page: null } }}
        />
}

export default Router