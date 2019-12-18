import React from 'react'
import PageBuilder from '../../page-builder'
import HomeFeed from '../../home-feed'

import { useAuth } from '../../auth'

import WhiteValleySwoop from '../../images/white_valley_swoop.svg'
import WhiteMountainSwoop from '../../images/white_mountain_swoop.svg'
import BottomSwoop from '../../images/bottom_swoop.svg'

const HomeRouter = () => {
    const { isLoggedIn } = useAuth()

    return isLoggedIn
        ? <HomeFeed />
        : <PageBuilder
            title="home-page"
            theme="swoop"
        />
}

export default HomeRouter