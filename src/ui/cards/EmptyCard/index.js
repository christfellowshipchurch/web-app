import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const EmptyCard = ({
    children,
    className,
    style
}) => (
        <div
            className={classnames(
                'card',
                'border-0',
                'shadow-sm',
                'm-4',
                className
            )}
            style={style}
        >
            <div className='card-body'>
                {children}
            </div>
        </div>
    )

EmptyCard.defaultProps = {
    className: '',
    style: {}
}

EmptyCard.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
}

export default EmptyCard