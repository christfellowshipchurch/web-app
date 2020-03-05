import React from 'react';
import PageBuilder from '../../page-builder';
import HomeFeed from '../../home-feed';

import { useAuth } from '../../auth';

const HomeRouter = () => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn
        ? <HomeFeed />
        : (
            <PageBuilder
                title="home-page"
                theme="swoop"
            />
        );
};

export default HomeRouter;
