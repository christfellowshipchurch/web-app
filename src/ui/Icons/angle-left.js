import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ size, fill }) => {
  
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" aria-labelledby="title">
    <path 
      d="M7.6875 11.625C7.45312 11.8594 7.45312 12.1875 7.6875 12.4219L14.5781 19.3594C14.7656 19.5938 15.1406 19.5938 15.375 19.3594L16.2656 18.4219C16.5 18.1875 16.5 17.8594 16.2656 17.625L10.7344 12L16.2656 6.42188C16.5 6.1875 16.5 5.8125 16.2656 5.625L15.375 4.6875C15.1406 4.45312 14.7656 4.45312 14.5781 4.6875L7.6875 11.625Z"
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