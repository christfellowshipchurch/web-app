import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { get } from 'lodash';

import { Browse } from '../../browse';

const BrowseUrlMapper = ({ match: { params } }) => (
  <Browse
    filter={get(params, 'filter', null)}
    category={get(params, 'category', null)}
    title={get(params, 'title', null)}
    openSearch={get(params, 'filter') === 'search'}
  />
);

const SearchOnBrowse = () => <Browse openSearch={true} />;

const Router = () => (
  <Switch>
    <Route exact path="/discover/:filter" component={BrowseUrlMapper} />
    <Route exact path="/discover/:filter/:category" component={BrowseUrlMapper} />
    <Route exact path="/discover/:filter/:category/:title" component={BrowseUrlMapper} />

    <Route path="*" component={Browse} />
  </Switch>
);

export default Router;
