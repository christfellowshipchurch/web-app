import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { useAuth } from 'auth';
import { Groups, GroupContentItemConnected } from 'groups';

import redirects from 'redirects.json';

const GroupSingle = ({
  match: { params: { groupName } = {} } = {},
  location: { state: { contentId } = {} } = {},
}) => {
  const { isLoggedIn } = useAuth();

  /* Groups are not publically discoverable. The following rules apply and result in a redirecting
   * you to `/groups` as the safest UX option due to failure:
   *   - You can only view a group in you're in the group.
   *   - You can only navigate to a group by way of the `/groups` page. This is where we validate
   *     what groups a user is in. Coincadently, you can't navigate directly to a group page because
   *     we wouldn't have a `contentId` which is passed in via `/groups`. */
  if (!isLoggedIn || !contentId) return <Redirect to="/groups" />;

  // check if the redirects.json file has a redirect for this page
  const page = groupName;
  const redirect = redirects[decodeURI(page)];

  if (!!redirect && redirect !== '') {
    window.location.href = redirect;
    return null; // return null so nothing is rendered while the redirect is happening
  }

  // if no redirect, proceed to the Router
  return <GroupContentItemConnected itemId={contentId} />;
};

const Router = () => (
  <Switch>
    <Route exact path="/groups/:groupName" component={GroupSingle} />

    <Route path="*" component={Groups} />
  </Switch>
);

export default Router;
