import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ size, fill }) => {
  
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" aria-labelledby="title">
    <path 
      d="M22.4141 11.9375C22.4141 6.18457 17.7529 1.52344 12 1.52344C6.24707 1.52344 1.58594 6.18457 1.58594 11.9375C1.58594 17.1445 5.36523 21.4697 10.3623 22.2256V14.9609H7.7168V11.9375H10.3623V9.66992C10.3623 7.06641 11.916 5.59668 14.2676 5.59668C15.4434 5.59668 16.6191 5.80664 16.6191 5.80664V8.36816H15.3174C14.0156 8.36816 13.5957 9.16602 13.5957 10.0059V11.9375H16.4932L16.0312 14.9609H13.5957V22.2256C18.5928 21.4697 22.4141 17.1445 22.4141 11.9375Z"
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