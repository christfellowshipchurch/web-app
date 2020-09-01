import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PasswordResetForm, RequestEmailPinForm } from '../../login/Reset';

const Router = () => (
  <Switch>
    <Route exact path="/login/reset-password" component={PasswordResetForm} />
    <Route exact path="/login/forgot" component={RequestEmailPinForm} />
    <Route path="*">
      <Redirect to="/" />
    </Route>
  </Switch>
);

export default Router;
