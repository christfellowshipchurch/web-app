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
    <circle fill={fill} cx="2.625" cy="2.625" r="2.625" />
    <circle fill={fill} cx="19.875" cy="2.625" r="2.625" />
    <circle fill={fill} cx="11.25" cy="2.625" r="2.625" />
  </svg>
);

export default Icon;

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

Icon.defaultProps = {
  size: 32,
};
