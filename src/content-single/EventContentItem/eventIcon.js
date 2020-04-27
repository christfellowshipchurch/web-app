import React from 'react'
import PropTypes from 'prop-types'

const EventIcon = ({
  icon,
  color,
  size,
  className
}) => (
    <span 
      className={className}
    >
      {React.createElement(
          icon,
          {
              fill: color,
              size: size,
          },
      )}
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
