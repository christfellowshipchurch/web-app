import React from 'react'
import {
    Switch, Route, Redirect
} from 'react-router-dom'

import { ContentSingle } from '../../content-single'

const ContentSingleWithRouter = ({ match: { params } }) => {
    return <ContentSingle
        {...params}
    />
}

const Router = () => {
    return (
        <Switch>
            <Route exact path="/content/:contentTitle" component={ContentSingleWithRouter} />

            <Route path="*">
                <Redirect to="/browse" />
            </Route>
        </Switch>
    )
}

export default Router