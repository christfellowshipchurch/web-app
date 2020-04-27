import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ size, fill }) => {
  
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" aria-labelledby="title">
    <path 
      d="M16.2656 12.4219C16.5 12.1875 16.5 11.8594 16.2656 11.625L9.42188 4.6875C9.1875 4.45312 8.8125 4.45312 8.625 4.6875L7.6875 5.625C7.45312 5.8125 7.45312 6.1875 7.6875 6.42188L13.2188 12L7.6875 17.625C7.45312 17.8594 7.45312 18.1875 7.6875 18.4219L8.625 19.3594C8.8125 19.5938 9.1875 19.5938 9.42188 19.3594L16.2656 12.4219"
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