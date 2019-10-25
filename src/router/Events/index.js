import React from 'react'
import {
    Switch, Route, Redirect
} from 'react-router-dom'

import {
    EventDetail,
    EventBanner,
    EventList,
} from '../../events'

const htmlContent = 'We are gathering January 19 at 7pm at our Palm Beach Gardens location for a great night of celebration and vision from Pastor Todd & Julie. They have something pretty exciting to share with all of us and you won’t want to miss it. Even if you’re not apart of the Dream Team, but want to be apart of it, you are invited too! The Dream Team are men, women, and students just like you that are using their gifts and talents in the church to make a difference in their lives. And we would love for you to jump in and be a part!'

const EventDetailLayout = ({ match: { params: { eventName } } }) => (
    <>
        <EventBanner
            eventName={eventName}
        />

        <EventDetail
            htmlContent={htmlContent}
        />
    </>
)

const Router = () => (
    <Switch>
        <Route exact path="/events/:eventName" component={EventDetailLayout} />

        <Route path="*" component={EventList} />

    </Switch>
)

export default Router