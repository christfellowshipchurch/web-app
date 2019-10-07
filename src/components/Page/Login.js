import React, { useState } from 'react'
import gql from 'graphql-tag'
import { get } from 'lodash'
import classnames from 'classnames'
import {
  TextInput,
  Button
} from '@christfellowshipchurch/web-ui-kit'

import {
  useAuth,
  useAuthQuery,
} from '../../auth'

import LoginForm from '../../login'

// import IdentityForm from '../../login/Identity'

const DefaultPage = () => {
  return (
    <div className="container my-6">
      <div className="row">
        <div className="col">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

DefaultPage.defaultProps = {
}

DefaultPage.propTypes = {
}

export default DefaultPage
