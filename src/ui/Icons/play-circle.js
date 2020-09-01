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
        d="M16.8291 11.1816L9.43848 6.68848C8.7666 6.35254 7.96875 6.81445 7.96875 7.57031V16.3047C7.96875 17.1025 8.7666 17.5645 9.43848 17.1865L16.8291 12.9453C17.543 12.5674 17.543 11.6016 16.8291 11.1816ZM22.4141 11.9375C22.4141 6.18457 17.7529 1.52344 12 1.52344C6.24707 1.52344 1.58594 6.18457 1.58594 11.9375C1.58594 17.6904 6.24707 22.3516 12 22.3516C17.7529 22.3516 22.4141 17.6904 22.4141 11.9375ZM3.60156 11.9375C3.60156 7.31836 7.33887 3.53906 12 3.53906C16.6191 3.53906 20.3984 7.31836 20.3984 11.9375C20.3984 16.5986 16.6191 20.3359 12 20.3359C7.33887 20.3359 3.60156 16.5986 3.60156 11.9375Z"
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
