import React from 'react'
import PropTypes from 'prop-types'
import icons from '../../icons.json'

const Icon = ({ type, size, fill }) => {
  
  const selectedIcon = icons[type]

  const viewBox = selectedIcon.viewBox
  const iconShape = selectedIcon.d
  
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={viewBox} aria-labelledby="title">
    <path 
      d={iconShape}
      fill={fill}
    />
  </svg>
)}

export default Icon

Icon.propTypes = { 
  size: PropTypes.number,
  fill: PropTypes.string,
  type: PropTypes.string
};

Icon.defaultProps = {
  size: 32,
  type: 'home'
}