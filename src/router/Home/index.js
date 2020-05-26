import React from 'react';
import PageBuilder from '../../page-builder';
import FeaturesFeed from '../../features-feed';
import {
     Redirect
} from 'react-router-dom'


import { useAuth } from '../../auth';

const HomeRouter = () => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn &&
        <Redirect to='/'/>
};

export default FeaturesFeed;
