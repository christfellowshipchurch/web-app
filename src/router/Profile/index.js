import React from 'react'
import { Route } from 'react-router-dom'

import ProfilePage from '../../profile'
import { default as Default } from '../../components/Page'

import { useAuth } from '../../auth'

const Router = () => {
    const { isLoggedIn } = useAuth()

    return isLoggedIn
        ? <Route exact path="/profile" component={ProfilePage} />
        : <Default 
            title="home-page" 
            showLogIn
            match={{ params: { page: null } }} 
        />
}

export default Router