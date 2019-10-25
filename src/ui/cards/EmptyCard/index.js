import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const EmptyCard = ({
    children,
    className,
    style,
    shadow
}) => (
        <div
            className={classnames(
                'card',
                'border-0',
                'mx-2',
                'my-3',
                {
                    [`shadow-${shadow}`]: shadow !== '',
                    [`shadow`]: shadow === ''
                },
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
    style: {},
    shadow: '',
}

EmptyCard.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    shadow: PropTypes.oneOf(['', 'sm', 'lg']),
}

export default EmptyCard