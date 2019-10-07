import React from 'react'
import PropTypes from 'prop-types'
import  Button  from '../Button'

import { redirectTo } from '../../../utils'

const ButtonRow = ({ callToAction, secondaryCallToAction, openLinksInNewTab }) => (
    <div>
        {callToAction
            && callToAction.call !== ''
            && callToAction.action !== ''
            && <Button
                type='primary'
                title={callToAction.call}
                onClick={() => redirectTo(callToAction.action, openLinksInNewTab)} />}


        <br></br>

        {secondaryCallToAction
            && secondaryCallToAction.call !== ''
            && secondaryCallToAction.action !== ''
            && <Button
                type='link'
                className='text-white'
                title={secondaryCallToAction.call}
                onClick={() => redirectTo(secondaryCallToAction.action, openLinksInNewTab)} />}

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