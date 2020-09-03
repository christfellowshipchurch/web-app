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
        d="M11.5781 16.3125C11.8125 16.5469 12.1406 16.5469 12.375 16.3125L19.3125 9.42188C19.5469 9.23438 19.5469 8.85938 19.3125 8.625L18.375 7.73438C18.1875 7.5 17.8125 7.5 17.5781 7.73438L12 13.2656L6.375 7.73438C6.14062 7.5 5.8125 7.5 5.57812 7.73438L4.64062 8.625C4.40625 8.85938 4.40625 9.23438 4.64062 9.42188L11.5781 16.3125Z"
        fill={fill}
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
