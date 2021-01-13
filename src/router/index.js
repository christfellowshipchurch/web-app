import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ErrorBlock } from '../ui';
import redirects from '../redirects.json';
//temp redirect file
import christmasRedirects from '../christmas-redirects.json';
import PageBuilder from './PageBuilder';
import HomePage from './Home';
import Login from './Login';
import Events from './Events';
import Groups from './Groups';
import Browse from './Browse';
import Content from './Content';
import Items from './Items';
import Profile from './Profile';
import Animations from './Animations';
import Campuses from './Campuses';
import Live from './Live';
import LinkTree from './LinkTree';

const RedirectMapper = (props) => {
  // get page title from props
  const { match: { params: { page } = {} } = {} } = props;

  //const redirect = redirects[decodeURI(page)];
  //Temporary: combined christmas redirect file for the Christmas Countdown Devos
  const combinedRedirects = Object.assign(redirects, christmasRedirects);
  const redirect = combinedRedirects[decodeURI(page)];

  // check if the redirects.json file has a redirect for this page
  if (!!redirect && redirect !== '') {
    window.location.href = redirect;
    return null; // return null so nothing is rendered while the redirect is happening
  }

  // if no redirect, proceed to the Page Builder
  return <PageBuilder {...props} />;
};

const Router = () => (
  <Switch>
    <Route exact path="/animations" component={Animations} />

    {/* TODO : remove this comment when the feature flag is ready to go back on */}
    <Route path="/login" component={Login} />
    <Route path="/events" component={Events} />
    <Route path="/groups" component={Groups} />
    <Route path="/content" component={Content} />
    <Route path="/items" component={Items} />
    <Route path="/discover" component={Browse} />
    <Route path="/profile" component={Profile} />
    <Route path="/locations" component={Campuses} />
    <Route path="/error" component={ErrorBlock} />
    <Route path="/live" component={Live} />
    <Route path="/info" component={LinkTree} />

    <Route exact path="/:page" component={RedirectMapper} />

    <Route path="*" component={HomePage} />
  </Switch>
);

export default Router;
