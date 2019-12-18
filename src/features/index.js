import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'

import EmailCapture from './EmailCapture'
import CampusSelect from './CampusSelect'
import RsvpForm from './RsvpForm'

const featureMap = {
    emailCaptureForm: EmailCapture,
    locationFinderWithRsvpForm: CampusSelect,
    rsvpForm: RsvpForm
}

export const Feature = ({
    name,
    ...featureProps
}) => {
    const Element = get(featureMap, name, React.Fragment)

    return <Element {...featureProps} />
}

Feature.propTypes = {
    name: PropTypes.string.isRequired
}
