import React from 'react';
import FeaturesFeed from '../../features-feed';

import ExternalHome from './ExternalHome.js';

import { useAuth } from '../../auth';

const HomeRouter = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <FeaturesFeed /> : <ExternalHome />;
};

export default HomeRouter;
