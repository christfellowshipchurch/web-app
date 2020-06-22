import React from 'react';
import {
    Switch, Route, Redirect,
} from 'react-router-dom';
import { last } from 'lodash';

import ContentSingle from '../../content-single';

const ContentSingleWithRouter = ({ match: { params: { contentTitle = '' } = {} } } = {}) => {
    const id = last(contentTitle.split('-'));
    return (
        <ContentSingle
            itemId={`InformationalContentItem:${id}`}
        />
    );
};

const Router = () => (
    <Switch>
        <Route exact path="/items/:contentTitle" component={ContentSingleWithRouter} />

        <Route path="*">
            <Redirect to="/discover" />
        </Route>
    </Switch>
);

export default Router;
