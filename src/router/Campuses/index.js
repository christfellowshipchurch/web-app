import React from 'react'
import {
    Switch, Route, Redirect
} from 'react-router-dom'

import { CampusPageBuilder } from '../../campus'

const PropertyMapper = ({ match: { params: { name } } }) =>
    <CampusPageBuilder name={name} />

const Router = () => (
    <Switch>
        <Route exact path="/locations/:name" component={PropertyMapper} />

        <Route path="*">
            <Redirect to="/" />
        </Route>
    </Switch>
)

export default Router