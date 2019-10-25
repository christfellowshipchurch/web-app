import React from 'react'
import {
    Switch, Route, Redirect
} from 'react-router-dom'
import { get } from 'lodash'

import { Browse } from '../../browse'

const BrowseUrlMapper = ({
    match: { params }
}) => <Browse
        filter={get(params, 'filter', null)}
        category={get(params, 'category', null)}
        title={get(params, 'title', null)}
    />

const Router = () => (
    <Switch>
        <Route exact path="/browse/:filter" component={BrowseUrlMapper} />
        <Route exact path="/browse/:filter/:category" component={BrowseUrlMapper} />
        <Route exact path="/browse/:filter/:category/:title" component={BrowseUrlMapper} />

        <Route path="*" component={Browse} />
    </Switch>
)

export default Router