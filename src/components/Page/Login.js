import React from 'react'
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
