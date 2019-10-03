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


const GET_CURRENT_PERSON = gql`
    query {
        currentUser {
            profile {
                firstName
                lastName 
            }
        }
    }
`

const CurrentPerson = () => {
  const { data, loading, error } = useAuthQuery(GET_CURRENT_PERSON)

  const currentUser = get(data, 'currentUser.profile', null)

  return (
    <div className="row my-6">
      <div className="col-12">
        {loading &&
          <h2>
            Loading...
          </h2>
        }

        {error &&
          <h2>
            !! Error !!
          </h2>
        }

        {currentUser &&
          <h2>
            Current User: {`${currentUser.firstName} ${currentUser.lastName}`}
          </h2>
        }
      </div>
    </div>
  )
}

const LoginStatus = () => {
  const { isLoggedIn } = useAuth()

  return (
    <span
      className={classnames(
        'badge',
        {
          'badge-success': isLoggedIn,
          'badge-danger': !isLoggedIn,
        }
      )}
    >
      {isLoggedIn ? 'Logged In' : 'Logged Out'}
    </span>
  )
}

const LogoutButton = () => {
  const { isLoggedIn, logout } = useAuth()
  const onClick = () => {
    logout()
  }

  return (
    <button
      className={classnames(
        'btn',
        'btn-outline-secondary',
        'btn-sm',
        'mx-3'
      )}
      disabled={!isLoggedIn}
      onClick={onClick}
    >
      Log Out
    </button>
  )
}

const DefaultPage = () => {
  const { token, setToken } = useAuth()
  const [value, setValue] = useState(token)
  const newToken = value

  const onClick = () => setToken(newToken)
  // const onClick = () => true

  return (
    <div className="container my-6">
      <div className="row">
        <div className="col">
          <h1>
            Login : <LoginStatus />
          </h1>
          <h3>
            <span
              className={'badge badge-info'}
            >
              {token}
            </span>
          </h3>
        </div>
      </div>

      <div className="row my-6">
        <div className="col">
          <TextInput
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button
            className="btn btn-secondary btn-sm"
            onClick={onClick}
          >
            Update Token
          </button>
          <LogoutButton />
        </div>
      </div>
      <CurrentPerson />
    </div>
  )
}

DefaultPage.defaultProps = {
}

DefaultPage.propTypes = {
}

export default DefaultPage
