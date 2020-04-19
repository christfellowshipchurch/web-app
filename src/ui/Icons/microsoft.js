import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ size, fill }) => {
  
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" aria-labelledby="title">
    <path 
      d="M2.59375 2.53125V11.5596H11.5801V2.53125H2.59375ZM12.3779 2.53125V11.5596H21.4062V2.53125H12.3779ZM2.59375 12.3574V21.3438H11.5801V12.3574H2.59375ZM12.3779 12.3574V21.3438H21.4062V12.3574H12.3779Z"
      fill={fill}
    />
  </svg>
)}

export default Icon

Icon.propTypes = { 
  size: PropTypes.number,
  fill: PropTypes.string,
};

Icon.defaultProps = {
  size: 32,
}