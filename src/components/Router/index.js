import React from 'react'
import {
    Switch, Route
} from 'react-router-dom'

import DefaultPage, { UIPage, Login, EventPage } from '../Page'
import { ArticleList, ArticleDetail } from '../Page/Articles'
import { HomePage } from '../../pages'

const Router = () => (
    <Switch>
        <Route exact path="/ui" component={UIPage} />
        <Route exact path="/event-detail" component={EventPage} />
        <Route exact path="/login" component={Login} />

        <Route exact path="/articles/" component={ArticleList} />
        <Route exact path="/articles/:articleTitle" component={ArticleDetail} />

        <Route exact path="/:page" component={DefaultPage} />

        <Route path="*" component={DefaultPage} />
    </Switch>
)

export default Router