import React from 'react'
import {
    Switch, Route, Redirect
} from 'react-router-dom'

import { Article } from '../../articles'

const Router = () => (
    <Switch>
        <Route exact path="/articles/:articleTitle" component={Article} />

        <Route path="*">
            <Redirect to="/browse/articles" />
        </Route>
    </Switch>
)

export default Router