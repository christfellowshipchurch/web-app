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
        d="M16.7031 13.4492C16.7031 13.1973 16.4512 12.9453 16.1992 12.9453H13.0078V9.75391C13.0078 9.50195 12.7559 9.25 12.5039 9.25H11.4961C11.2021 9.25 10.9922 9.50195 10.9922 9.75391V12.9453H7.80078C7.50684 12.9453 7.29688 13.1973 7.29688 13.4492V14.457C7.29688 14.751 7.50684 14.9609 7.80078 14.9609H10.9922V18.1523C10.9922 18.4463 11.2021 18.6562 11.4961 18.6562H12.5039C12.7559 18.6562 13.0078 18.4463 13.0078 18.1523V14.9609H16.1992C16.4512 14.9609 16.7031 14.751 16.7031 14.457V13.4492ZM21.4062 5.89062C21.4062 4.79883 20.4824 3.875 19.3906 3.875H17.375V1.69141C17.375 1.43945 17.123 1.1875 16.8711 1.1875H15.1914C14.8975 1.1875 14.6875 1.43945 14.6875 1.69141V3.875H9.3125V1.69141C9.3125 1.43945 9.06055 1.1875 8.80859 1.1875H7.12891C6.83496 1.1875 6.625 1.43945 6.625 1.69141V3.875H4.60938C3.47559 3.875 2.59375 4.79883 2.59375 5.89062V20.6719C2.59375 21.8057 3.47559 22.6875 4.60938 22.6875H19.3906C20.4824 22.6875 21.4062 21.8057 21.4062 20.6719V5.89062ZM19.3906 20.4199C19.3906 20.5879 19.2646 20.6719 19.1387 20.6719H4.86133C4.69336 20.6719 4.60938 20.5879 4.60938 20.4199V7.90625H19.3906V20.4199Z"
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
