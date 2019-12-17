import React from 'react'
import Auth from './Auth'
import { default as Default } from '../../components/Page'
import HomeFeed from '../../home-feed'

import { useAuth } from '../../auth'

const HomeRouter = ({ match: { params: { page } } }) => {
    const { isLoggedIn } = useAuth()

    return isLoggedIn
        ? <HomeFeed />
        : <Default title="home-page" match={{ params: { page: null } }} />
}

export default HomeRouter