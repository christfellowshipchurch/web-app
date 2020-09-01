import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ size, fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-labelledby="title"
  >
    <circle cx="12" cy="12" r="12" fill={fill} />
  </svg>
);

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

Icon.defaultProps = {
  size: 32,
};

export default Icon;
