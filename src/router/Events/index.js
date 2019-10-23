import React from 'react'
import {
    Switch, Route, Redirect
} from 'react-router-dom'

import EventDetail from '../../components/Page/Events'

const Router = () => (
    <Switch>
        <Route exact path="/events/:eventName" component={EventDetail} />

        <Route path="*">
            <Redirect to="/" />
        </Route>

    </Switch>
)

export default Router