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
        d="M22.2461 12.1895C22.2461 11.5176 22.1621 11.0137 22.0781 10.4678H12.168V14.0371H18.0469C17.8369 15.5908 16.2832 18.5303 12.168 18.5303C8.59863 18.5303 5.70117 15.5908 5.70117 11.9375C5.70117 6.10059 12.5879 3.41309 16.2832 6.98242L19.1387 4.25293C17.333 2.57324 14.9395 1.52344 12.168 1.52344C6.37305 1.52344 1.75391 6.18457 1.75391 11.9375C1.75391 17.7324 6.37305 22.3516 12.168 22.3516C18.1729 22.3516 22.2461 18.1523 22.2461 12.1895Z"
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
