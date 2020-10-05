import React from 'react';
import FeaturesFeed from '../../features-feed';
import { useAuth } from '../../auth';

import ExternalHome from './ExternalHome.js';

const HomeRouter = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <FeaturesFeed /> : <ExternalHome />;
};

export default HomeRouter;
