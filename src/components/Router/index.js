import React from 'react'
import {
    Switch, Route
} from 'react-router-dom'

import DefaultPage, { UIPage } from '../Page'
import { ArticleList, ArticleDetail } from '../Page/Articles'

const Router = () => (
    <Switch>
        <Route exact path="/ui" component={UIPage} />

        <Route exact path="/articles/" component={ArticleList} />
        <Route exact path="/articles/:articleTitle" component={ArticleDetail} />

        <Route exact path="/:page" component={DefaultPage} />

        <Route path="*" component={DefaultPage} />
    </Switch>
)

export default Router