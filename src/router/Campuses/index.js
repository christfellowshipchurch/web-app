import React from 'react'
import {
    Switch, Route, Redirect
} from 'react-router-dom'

import { CampusPageBuilder } from '../../campus'
import PageBuilder from '../../page-builder'

const PropertyMapper = ({ match: { params: { name } } }) =>
    <CampusPageBuilder name={name} />

const LocationsPage = () => <PageBuilder
    title="locations"
    theme="swoop"
/>

const Router = () => (
    <Switch>
        <Route exact path="/locations/:name" component={PropertyMapper} />

        <Route path="*" component={LocationsPage} />
    </Switch>
)

export default Router