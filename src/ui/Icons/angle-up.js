import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ size, fill }) => {
  
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" aria-labelledby="title">
    <path 
      d="M12.375 7.73438C12.1406 7.5 11.8125 7.5 11.5781 7.73438L4.64062 14.5781C4.40625 14.8125 4.40625 15.1875 4.64062 15.375L5.57812 16.3125C5.8125 16.5469 6.14062 16.5469 6.375 16.3125L12 10.7812L17.5781 16.3125C17.8125 16.5469 18.1875 16.5469 18.375 16.3125L19.3125 15.375C19.5469 15.1875 19.5469 14.8125 19.3125 14.5781L12.375 7.73438Z"
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