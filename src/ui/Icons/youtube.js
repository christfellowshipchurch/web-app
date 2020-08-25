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
        d="M22.96 6.43652C22.708 5.42871 21.9102 4.63086 20.9443 4.37891C19.1387 3.875 12 3.875 12 3.875C12 3.875 4.81934 3.875 3.01367 4.37891C2.04785 4.63086 1.25 5.42871 0.998047 6.43652C0.494141 8.2002 0.494141 11.9795 0.494141 11.9795C0.494141 11.9795 0.494141 15.7168 0.998047 17.5225C1.25 18.5303 2.04785 19.2861 3.01367 19.5381C4.81934 20 12 20 12 20C12 20 19.1387 20 20.9443 19.5381C21.9102 19.2861 22.708 18.5303 22.96 17.5225C23.4639 15.7168 23.4639 11.9795 23.4639 11.9795C23.4639 11.9795 23.4639 8.2002 22.96 6.43652ZM9.64844 15.3809V8.57812L15.6113 11.9795L9.64844 15.3809Z"
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
