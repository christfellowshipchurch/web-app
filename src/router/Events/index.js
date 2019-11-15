import React from 'react'
import {
    Switch, Route, Redirect
} from 'react-router-dom'

import EventConnected from './EventConnected'
import EventListConnected from './EventListConnected'

const EventDetailLayout = ({ match: { params: { eventName } } }) => (
    <EventConnected title={eventName} />
)

const Router = () => (
    <Switch>
        <Route exact path="/events/:eventName" component={EventDetailLayout} />

        <Route path="*" component={EventListConnected} />

    </Switch>
)

export default Router