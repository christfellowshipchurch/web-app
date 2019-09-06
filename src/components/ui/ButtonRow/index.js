import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@christfellowshipchurch/web-ui-kit'

import { redirectTo } from '../../../utils'

const ButtonRow = ({ callToAction, secondaryCallToAction }) => (
    <div>
        {callToAction
            && callToAction.call !== ''
            && callToAction.action !== ''
            && <Button
                type='primary'
                title={callToAction.call}
                onClick={() => redirectTo(callToAction.action)} />}

        <br></br>

        {secondaryCallToAction
            && secondaryCallToAction.call !== ''
            && secondaryCallToAction.action !== ''
            && <Button
                type='link'
                title={secondaryCallToAction.call}
                onClick={() => redirectTo(secondaryCallToAction.action)} />}
    </div>
)

ButtonRow.propTypes = {
    callToAction: PropTypes.shape({
        call: PropTypes.string.isRequired,
        action: PropTypes.string.isRequired
    }),
    secondaryCallToAction: PropTypes.shape({
        call: PropTypes.string.isRequired,
        action: PropTypes.string.isRequired
    })
}

export default ButtonRow