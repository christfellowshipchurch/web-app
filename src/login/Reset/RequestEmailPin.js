import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from 'react-apollo'

import { REQUEST_EMAIL_PIN } from '../mutations'

const RequestEmailPin = ({
    children,
    email,
    update
}) => {
    const [requestPin] = useMutation(REQUEST_EMAIL_PIN)
    const [disabled, setDisabled] = useState(false)

    return (
        <a
            disabled={disabled}
            href="#"
            onClick={(e) => {
                e.preventDefault()
                setDisabled(true)
                requestPin({
                    variables: { email },
                    update: () => {
                        setDisabled(false)
                        update()
                    }
                })
            }}
        >
            {children}
        </a>
    )
}

RequestEmailPin.propTypes = {
    email: PropTypes.string.isRequired
}

RequestEmailPin.defaultProps = {
}

export default RequestEmailPin