import React from 'react'

import NavbarConnected from './NavbarConnected'

const AuthNavbar = () => {

    const learnMoreLinks = [
        {
            call: 'About Christ Fellowship',
            action: ''
        },
        {
            call: 'Church Locations',
            action: ''
        },
        {
            call: 'Request Prayer',
            action: ''
        },
        {
            call: 'Contact',
            action: ''
        }
    ]

return(
    <NavbarConnected
        learnMore={learnMoreLinks}
    />
)}

export default AuthNavbar