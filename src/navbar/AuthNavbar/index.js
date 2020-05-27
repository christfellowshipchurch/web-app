import React from 'react'
import PropTypes from 'prop-types'

import NavbarConnected from './NavbarConnected'

const AuthNavbar = ({ navLinks, quickAction }) => {

    return (
        <NavbarConnected 
            learnMoreLinks={navLinks}
            quickAction={quickAction}
        />
    )
}

AuthNavbar.propTypes = {
    learnMoreLinks: PropTypes.array
}

AuthNavbar.defaultProps = {

}

export default AuthNavbar