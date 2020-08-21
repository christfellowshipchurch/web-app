import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Groups, GroupContentItemConnected } from '../../groups';

import redirects from '../../redirects.json';

const GroupSingle = ({
  match: { params: { groupName } = {} } = {},
  location: { state: { contentId } = {} } = {},
}) => {
  const page = groupName;
  const redirect = redirects[decodeURI(page)];

  // check if the redirects.json file has a redirect for this page
  if (!!redirect && redirect !== '') {
    window.location.href = redirect;
    return null; // return null so nothing is rendered while the redirect is happening
  }

  // if no redirect, proceed to the Router
  return <GroupContentItemConnected itemId={contentId} title={groupName} />;
};

const Router = () => (
  <Switch>
    <Route exact path="/groups/:groupName" component={GroupSingle} />

    <Route path="*" component={Groups} />
  </Switch>
);

export default Router;
