import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { User } from "../Icons"

const InputIcon = ({ icon, focused, color }) => (
    <div
        className={classnames(
            "d-flex",
            "align-items-end",
            "justify-content-center"
        )}
        style={{
            fontSize: 24,
            minWidth: 30
        }}
    >
        {React.createElement(
            icon,
            {
                fill: color
            }
        )}
    </div>
)

InputIcon.defaultProps = {
    icon: User,
    focused: false,
    color: 'black'
}

InputIcon.propTypes = {
    icon: PropTypes.object,
    focused: PropTypes.bool,
    color: PropTypes.string
}

export default InputIcon