import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-pro-light'

const FloatingCard = ({
    children,
    overlay,
    onPressExit
}) => (
        <div
            className={classnames(
                "p-absolute",
                "min-vw-100",
                "min-vh-100",
                'd-flex',
                'justify-content-center',
                'align-content-center'
            )}
            style={{
                zIndex: 1000
            }}
        >
            <div className={classnames(
                "p-absolute",
                "w-100",
                "h-100",
                "bg-dark",
                'opacity-65',
                `bg-${overlay}`
            )}></div>
            <div
                className="card m-6"
                style={{
                    maxWidth: 600
                }}
            >
                <div
                    className={classnames(
                        "card-header",
                        "bg-white",
                        "text-right",
                        'border-0'
                    )}
                >
                    <button className="border-0" onClick={onPressExit}>
                        <FontAwesomeIcon icon={faTimes} size='2x' />
                    </button>
                </div>
                <div className="card-body px-4 pt-0">
                    {children}
                </div>
            </div>
        </div >
    )

FloatingCard.defaultProps = {
    overlay: 'dark'
}

FloatingCard.propTypes = {
    overlay: PropTypes.oneOf([
        'dark'
    ])
}

export default FloatingCard