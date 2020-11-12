/*
Note
----------------
Commented out lines below are for experiments with an alternate home page.
Not removing them for now, but commenting out to avoid lint warnings.
*/

// import React from 'react';
// import PageBuilder from '../../page-builder';
import FeaturesFeed from '../../features-feed';

// import { useAuth } from '../../auth';

// const HomeRouter = () => {
//   const { isLoggedIn } = useAuth();

//   return isLoggedIn ? <FeaturesFeed /> : <PageBuilder title="home-page" theme="swoop" />;
// };

export default FeaturesFeed;
