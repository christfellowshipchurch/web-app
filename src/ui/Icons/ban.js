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
        d="M12 1.52344C6.24707 1.52344 1.58594 6.22656 1.58594 11.9375C1.58594 17.6904 6.24707 22.3516 12 22.3516C17.7109 22.3516 22.4141 17.6904 22.4141 11.9375C22.4141 6.22656 17.7109 1.52344 12 1.52344ZM17.9209 6.0166C20.9863 9.08203 21.1543 13.8691 18.5928 17.1445L6.79297 5.34473C10.0684 2.7832 14.8555 2.95117 17.9209 6.0166ZM6.03711 17.9004C2.97168 14.835 2.80371 10.0479 5.36523 6.77246L17.165 18.5723C13.8896 21.1338 9.10254 20.9658 6.03711 17.9004Z"
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
