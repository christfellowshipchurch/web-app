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
        d="M13.9736 11.9375L18.5088 7.44434C18.7607 7.19238 18.7607 6.73047 18.5088 6.47852L17.459 5.42871C17.207 5.17676 16.7451 5.17676 16.4932 5.42871L12 9.96387L7.46484 5.42871C7.21289 5.17676 6.75098 5.17676 6.49902 5.42871L5.44922 6.47852C5.19727 6.73047 5.19727 7.19238 5.44922 7.44434L9.98438 11.9375L5.44922 16.4727C5.19727 16.7246 5.19727 17.1865 5.44922 17.4385L6.49902 18.4883C6.75098 18.7402 7.21289 18.7402 7.46484 18.4883L12 13.9531L16.4932 18.4883C16.7451 18.7402 17.207 18.7402 17.459 18.4883L18.5088 17.4385C18.7607 17.1865 18.7607 16.7246 18.5088 16.4727L13.9736 11.9375Z"
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
