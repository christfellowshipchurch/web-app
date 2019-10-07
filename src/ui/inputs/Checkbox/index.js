import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/fontawesome-pro-light'

const Checkbox = ({
    checked,
    onClick,
    type,
    label,
    error,
    ...buttonProps
}) => {
    const types = typeof (type) === 'string'
        ? { default: type, hover: type, checked: type }
        : type

    return (
        <div className="text-left">
            <button
                onClick={onClick}
                className={classnames(
                    'btn',
                    'btn-checkbox',
                    {
                        [`btn-outline-${types.default}`]: !checked,
                        [`btn-outline-${types.checked}`]: checked,
                    }
                )}
                {...buttonProps}
            >
                {checked &&
                    <i className="fal fa-check pl-1"></i>
                }
            </button>
            {error &&
                <label
                    className={classnames(
                        'ml-3',
                        'input-label-sm',
                        'text-danger'
                    )}
                >
                    {error}
                </label>
            }
            {label &&
                <label
                    className={classnames(
                        'ml-3',
                        'input-label'
                    )}
                >
                    {label}
                </label>
            }
        </div>
    )
}

Checkbox.propTypes = {
    checked: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            default: PropTypes.string,
            hover: PropTypes.string,
            checked: PropTypes.string
        })
    ]),
    label: PropTypes.string,
}

Checkbox.defaultProps = {
    checked: false,
    onClick: () => true,
    type: {
        default: 'dark',
        hover: 'primary',
        checked: 'primary',
    },
    label: null
}

export default Checkbox