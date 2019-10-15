import React from 'react'
import {
    Switch, Route, Redirect
} from 'react-router-dom'

import { PasswordResetForm } from '../../login/Reset'

const Router = () => (
    <Switch>
        <Route exact path="/login/reset-password" component={PasswordResetForm} />

        <Route path="*">
            <Redirect to="/" />
        </Route>

    </Switch>
)

export default Router