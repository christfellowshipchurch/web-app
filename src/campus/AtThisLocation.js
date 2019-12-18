import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { CardGrid } from '../ui'

const Container = ({ children }) => <div className='container-fluid'>
    <div className="row">
        {children}
    </div>
</div>

const AtThisLocation = ({
    features
}) => {
    return <CardGrid data={features} />
}

AtThisLocation.propTypes = {
    features: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            summary: PropTypes.string,
            icon: PropTypes.string,
            options: PropTypes.arrayOf(PropTypes.string),
            htmlContent: PropTypes.string,
        })
    ),
}

AtThisLocation.defaultProps = {
    features: []
}

export default AtThisLocation