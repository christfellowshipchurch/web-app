import React, { useState, useContext } from 'react'
import classnames from 'classnames'
import {
  TextInput
} from '@christfellowshipchurch/web-ui-kit'

import {
  AuthProvider,
  AuthContext
} from '../../auth'
import {
  useLogin,
  useAuth
} from '../../auth/hooks'

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
