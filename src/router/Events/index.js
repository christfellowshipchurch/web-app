import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import redirects from '../../redirects.json';
import EventConnected from './EventConnected';
import EventListConnected from './EventListConnected';

const EventDetailLayout = ({
  match: {
    params: { eventName },
  },
}) => {
  const page = eventName;
  const redirect = redirects[decodeURI(page)];

  // check if the redirects.json file has a redirect for this page
  if (!!redirect && redirect !== '') {
    window.location.href = redirect;
    return null; // return null so nothing is rendered while the redirect is happening
  }

  // if no redirect, proceed to the Router
  return <EventConnected title={eventName} />;
};

const Router = () => (
  <Switch>
    <Route exact path="/events/:eventName" component={EventDetailLayout} />

    <Route path="*" component={EventListConnected} />
  </Switch>
);

export default Router;
