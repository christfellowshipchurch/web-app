import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

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
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault()
                    onClick()
                }}
                className={classnames(
                    'btn-checkbox',
                    {
                        [`text-${types.default}`]: !checked,
                        [`text-${types.checked}`]: checked,
                    }
                )}
                {...buttonProps}
            >
                {checked
                    ? <i className="fal fa-check-square pl-1"></i>
                    : <i className="fal fa-square pl-1"></i>
                }
            </a>
            {error &&
                <label
                    className={classnames(
                        'ml-2',
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
                        'ml-2',
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