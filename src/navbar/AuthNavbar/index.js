import React from 'react'
import PropTypes from 'prop-types'

import NavbarConnected from './NavbarConnected'

const AuthNavbar = ({ learnMoreLinks }) => {

    return (
        <NavbarConnected />
    )
}

AuthNavbar.propTypes = {
    learnMoreLinks: PropTypes.array
}

AuthNavbar.defaultProps = {

}

export default AuthNavbar