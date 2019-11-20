import React from 'react'
import PropTypes from 'prop-types'

const ContactUsButton = ({
    mailto,
    body,
    subject,
    children,
    className
}) => {
    const href = `mailto:${mailto}?subject=${subject}&body=${body}`

    return (
        <a
            href={href}
            className={className}
        >
            {children}
        </a>
    )
}

ContactUsButton.propType = {
    subject: PropTypes.string,
    body: PropTypes.string,
    mailto: PropTypes.string,
}

ContactUsButton.defaultProps = {
    subject: "Contact Christ Fellowship",
    body: "Hello! I'd like to contact someone from Christ Fellowship",
    mailto: 'contact@christfellowship.church'
}

export default ContactUsButton
