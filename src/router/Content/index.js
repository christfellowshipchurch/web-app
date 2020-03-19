import React from 'react';
import {
    Switch, Route, Redirect,
} from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { get, last } from 'lodash';

import { GET_CATEGORY_BY_TITLE } from './queries';
import ContentSingle from '../../content-single';
import { CardFeed } from '../../content-feed';
import { Loader } from '../../ui';

const ContentSingleWithRouter = ({ match: { params: { contentTitle = '' } = {} } } = {}) => {
    const id = last(contentTitle.split('-'));
    return (
        <ContentSingle
            itemId={`UniversalContentItem:${id}`}
        />
    );
};

const CategoryUrlMapper = ({ match: { params: { category } } }) => {
    const { loading, error, data } = useQuery(
        GET_CATEGORY_BY_TITLE,
        { variables: { title: category } },
    );

    if (loading) return <Loader />;
    if (error) return null;

    const categoryData = get(data, 'getCategoryByTitle', {});

    return (
        <div
            className="container-fluid"
            style={{ minHeight: '100%' }}
        >
            <div className="row align-content-center mt-6 mb-n6">
                <h3>
                    {get(categoryData, 'title', '')}
                </h3>
            </div>
            <div className="row">
                <CardFeed id={get(categoryData, 'id', '')} />
            </div>
        </div>
    );
};

const Router = () => (
    <Switch>
        <Route exact path="/content/categories/:category" component={CategoryUrlMapper} />
        <Route exact path="/content/:contentTitle" component={ContentSingleWithRouter} />

        <Route path="*">
            <Redirect to="/browse" />
        </Route>
    </Switch>
);

export default Router;
