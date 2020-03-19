import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EventIcon = ({
  icon,
  color,
  size,
  className
}) => (
    <span
      style={{ fontSize: size }}
    >
      <FontAwesomeIcon
        icon={icon}
        color={color}
        className={className}
      />
    </span>
  )

EventIcon.propTypes = {
  icon: PropTypes.object.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
}

EventIcon.defaultProps = {
  color: '#525252',
  size: 24,
  className: '',
}

export default EventIcon
