import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import EmailCapture from './EmailCapture'

const featureMap = {
    emailCaptureForm: EmailCapture
}

export const Feature = ({
    name
}) => {
    const Element = get(featureMap, name, null)

    return <Element />
}

Feature.propTypes = {
    name: PropTypes.string.isRequired
}
