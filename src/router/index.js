import React from 'react'
import {
    Switch, Route
} from 'react-router-dom'

import DefaultPage, { UIPage } from '../components/Page'
import HomePage from './Home'
import Login from './Login'
import Events from './Events'
import Articles from './Articles'
import Browse from './Browse'
import Content from './Content'
import Profile from './Profile'
import Campuses from './Campuses'

const Router = () => {
    return (
        <Switch>
            <Route exact path="/ui" component={UIPage} />

            <Route path="/login" component={Login} />
            <Route path="/events" component={Events} />
            <Route path="/content" component={Content} />
            <Route path="/articles" component={Articles} />
            <Route path="/browse" component={Browse} />
            <Route path="/profile" component={Profile} />
            <Route path="/locations" component={Campuses} />

            <Route exact path="/:page" component={DefaultPage} />

            <Route path="*" component={HomePage} />
        </Switch>
    )
}

export default Router