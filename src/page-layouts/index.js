import React from 'react'
import PropTypes from 'prop-types'

import Swoop from './Swoop'
import Standard from './Standard'

const PageLayout = ({
    theme,
    ...props
}) => {
    switch (theme) {
        case "swoop":
            return <Swoop {...props} />
        default:
            return <Standard {...props} />
    }
}

PageLayout.propTypes = {
    theme: PropTypes.oneOf([
        'swoop',
        'standard'
    ])
}

PageLayout.defaultProps = {
    theme: 'standard'
}

export default PageLayout