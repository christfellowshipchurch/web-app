import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from 'react-apollo'

import { REQUEST_PIN } from '../mutations'

const ResendSMS = ({
    children,
    phoneNumber
}) => {
    const [requestPin] = useMutation(REQUEST_PIN)
    const [disabled, setDisabled] = useState(false)

    return (
        <a
            disabled={disabled}
            href="#"
            onClick={(e) => {
                e.preventDefault()
                setDisabled(true)
                requestPin({
                    variables: { phoneNumber },
                    update: () => setDisabled(false)
                })
            }}
        >
            {children}
        </a>
    )
}

ResendSMS.propTypes = {
    phoneNumber: PropTypes.string.isRequired
}

ResendSMS.defaultProps = {
}

export default ResendSMS