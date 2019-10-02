import React, { useState, useContext } from 'react'
import gql from 'graphql-tag'
import {
  useLazyQuery
} from 'react-apollo'
import classnames from 'classnames'
import {
  TextInput,
  Button
} from '@christfellowshipchurch/web-ui-kit'

import {
  AuthProvider,
  AuthContext
} from '../../auth'
import {
  useLogin,
  useAuth
} from '../../auth/hooks'

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
  const { isLoggedIn } = useContext(AuthContext)
  const [currentUser, setCurrentUser] = useState(null)
  const [getCurrentUser, { loading, data }] = useLazyQuery(GET_CURRENT_PERSON)

  if (data && data.getCurrentUser) {
    setCurrentUser(data.getCurrentUser.profile)
  }

  return (
    <div className="row">
      {currentUser && !loading &&
        <div className="col-12">
          <h2>
            Current User: {`${currentUser.firstName} ${currentUser.lastName}`}
          </h2>
        </div>
      }
      <div className="col-12">
        <Button
          loading={loading}
          disabled={loading && isLoggedIn}
          title="Get Current User"
          onClick={() => getCurrentUser()}
        />
      </div>
    </div>
  )

}

const LoginStatus = () => {
  const { isLoggedIn } = useContext(AuthContext)

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
  const { isLoggedIn, logout } = useContext(AuthContext)
  const onClick = () => {
    console.log("logout clicked")
    logout()
  }

  return (
    <button
      className={classnames(
        'btn',
        'btn-outline-secondary',
        'btn-sm'
      )}
      disabled={!isLoggedIn}
      onClick={onClick}
    >
      Log Out
    </button>
  )
}

const DefaultPage = () => {
  const { token, setToken } = useContext(AuthContext)
  const [value, setValue] = useState(token)

  const onClick = () => setToken(value)

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
    </div>
  )
}

DefaultPage.defaultProps = {
}

DefaultPage.propTypes = {
}

export default DefaultPage
