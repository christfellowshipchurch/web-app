import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// import GroupConnected from './GroupConnected';
import GroupListConnected from './GroupListConnected';

// import redirects from '../../redirects.json';

// const GroupDetailLayout = ({
//   match: {
//     params: { groupName },
//   },
// }) => {
//   const page = groupName;
//   const redirect = redirects[decodeURI(page)];
//
//   // check if the redirects.json file has a redirect for this page
//   if (!!redirect && redirect !== '') {
//     window.location.href = redirect;
//     return null; // return null so nothing is rendered while the redirect is happening
//   }
//
//   // if no redirect, proceed to the Router
//   return <GroupConnected title={groupName} />;
// };

const Router = () => (
  <Switch>
    {/* <Route exact path="/groups/:groupName" component={GroupDetailLayout} /> */}

    <Route path="*" component={GroupListConnected} />
  </Switch>
);

export default Router;
