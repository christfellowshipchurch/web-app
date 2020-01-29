import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { keys } from 'lodash'

const CardContainer = ({
    children,
    className,
    size,
    ...props,
}) => {

    return (
        <div
            className={classnames(
                keys(size).map(n => `col-${n}-${size[n]}`.replace('-xs', '')),
                'p-2',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

const SIZES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

CardContainer.defaultProps = {
    size: {
        xs: '6',
        md: '4',
    },
    className: '',
}

CardContainer.propTypes = {
    size: PropTypes.shape({
        xs: PropTypes.oneOf(SIZES),
        sm: PropTypes.oneOf(SIZES),
        md: PropTypes.oneOf(SIZES),
        lg: PropTypes.oneOf(SIZES),
        xl: PropTypes.oneOf(SIZES)
    }),
    className: PropTypes.string,
}

export default CardContainer