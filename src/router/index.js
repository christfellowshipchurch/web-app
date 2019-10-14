import React from 'react'
import {
    Switch, Route
} from 'react-router-dom'

import DefaultPage, { UIPage, Login } from '../components/Page'
import { ArticleList, ArticleDetail } from '../components/Page/Articles'
import HomePage from './Home'

const Router = () => (
    <Switch>
        <Route exact path="/ui" component={UIPage} />
        <Route exact path="/login" component={Login} />

        <Route exact path="/articles/" component={ArticleList} />
        <Route exact path="/articles/:articleTitle" component={ArticleDetail} />

        <Route exact path="/:page" component={DefaultPage} />

        <Route path="*" component={HomePage} />
    </Switch>
)

export default Router