import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const RingLoader = ({ color }) => (
    <div
        className={classnames(
            "fill",
            "d-flex",
            "justify-content-center",
            "align-items-center"
        )}
    >
        <div
            className={classnames(
                "spinner-border",
                `text-${color}`
            )}
            role="status"
        >
            <span className="sr-only">Loading...</span>
        </div>
    </div>
)

const propTypes = {
    color: PropTypes.string
}

const defaultProps = {
    color: 'primary'
}

RingLoader.propTypes = propTypes
RingLoader.defaultProps = defaultProps

export default RingLoader
