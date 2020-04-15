import React from 'react'
import PropTypes from 'prop-types'
import icons from '../../icons.json'

const Icon = ({ type, size, fill }) => {
  
  const iconShape = icons[type]
  
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" aria-labelledby="title">
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
  icon: PropTypes.string
};

Icon.defaultProps = {
  size: 32,
  type: 'home'
}