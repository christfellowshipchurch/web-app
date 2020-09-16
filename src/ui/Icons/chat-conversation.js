import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ size, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-labelledby="title"
    >
      <path
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11.25 18.75a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5h10.5a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-1.5v4.5l-4.5-4.5z"
      />
      <path
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 12.75l-3 3v-4.5h-1.5a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5h10.5a1.5 1.5 0 011.5 1.5v3"
      />
    </svg>
  );
};

export default Icon;

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

Icon.defaultProps = {
  size: 32,
};
