import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from 'react-apollo'

import { REQUEST_EMAIL_PIN } from '../mutations'

const RequestEmailPin = ({
    children,
    email,
    update,
    onClick
}) => {
    const [requestPin] = useMutation(REQUEST_EMAIL_PIN)
    const [disabled, setDisabled] = useState(false)

    return (
        <a
            disabled={disabled}
            href="#"
            onClick={(e) => {
                e.preventDefault()
                onClick()
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
    email: PropTypes.string.isRequired,
    update: PropTypes.func,
    onClick: PropTypes.func,
}

RequestEmailPin.defaultProps = {
    update: () => true,
    onClick: () => true,
}

export default RequestEmailPin