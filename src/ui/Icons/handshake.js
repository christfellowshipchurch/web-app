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
        d="M19.3848 7.125L17.6035 5.38086C17.2695 5.04688 16.6016 4.75 16.1562 4.75H7.73242C7.17578 4.75 6.65625 4.97266 6.24805 5.38086L4.50391 7.125H0.125V16.625H2.5C3.13086 16.625 3.65039 16.1055 3.65039 15.4375H4.02148L7.13867 18.2949C8.28906 19.2227 9.88477 19.2227 11.0723 18.4434C11.5176 18.8145 12.0371 19 12.5938 19C13.2617 19 13.8926 18.7402 14.4121 18.1094C15.2285 18.4434 16.1934 18.2207 16.7871 17.5156L17.752 16.291C17.9375 16.0312 18.0859 15.7715 18.1602 15.4375H20.3125C20.3125 16.1055 20.832 16.625 21.5 16.625H23.875V7.125H19.3848ZM1.90625 15.4375C1.57227 15.4375 1.3125 15.1777 1.3125 14.8438C1.3125 14.5098 1.57227 14.25 1.90625 14.25C2.20312 14.25 2.5 14.5098 2.5 14.8438C2.5 15.1777 2.20312 15.4375 1.90625 15.4375ZM16.3789 15.1777L15.377 16.3652C15.3027 16.5137 15.1172 16.5137 14.9688 16.4395L14.0781 15.6973L12.9648 17.0703C12.7422 17.3301 12.4082 17.2188 12.2969 17.1445L10.9238 15.9941L10.3672 16.6992C9.84766 17.3301 8.91992 17.4043 8.32617 16.9219L4.68945 13.6562H3.6875V8.90625H5.20898L7.50977 6.64258C7.58398 6.60547 7.6582 6.56836 7.73242 6.53125H9.84766L8.40039 7.86719C7.28711 8.86914 7.25 10.5391 8.21484 11.6152C8.77148 12.209 10.5156 13.1367 12 11.8008L12.2969 11.5039L16.3047 14.7695C16.4531 14.8809 16.4531 15.0664 16.3789 15.1777ZM20.3125 13.6562H17.7148C17.6406 13.582 17.5293 13.4707 17.4551 13.3965L13.6328 10.2793L14.0781 9.87109C14.3379 9.64844 14.3379 9.27734 14.1152 9.01758L13.7441 8.60938C13.5215 8.34961 13.1133 8.34961 12.8906 8.57227L10.8496 10.4277C10.4785 10.7617 9.88477 10.7988 9.55078 10.4277C9.2168 10.0566 9.25391 9.5 9.58789 9.16602L12.0371 6.93945C12.2969 6.67969 12.668 6.56836 13.0391 6.56836L16.1562 6.53125C16.2305 6.53125 16.3047 6.56836 16.3418 6.64258L18.6426 8.90625H20.3125V13.6562ZM22.0938 15.4375C21.7598 15.4375 21.5 15.1777 21.5 14.8438C21.5 14.5098 21.7598 14.25 22.0938 14.25C22.3906 14.25 22.6875 14.5098 22.6875 14.8438C22.6875 15.1777 22.3906 15.4375 22.0938 15.4375Z"
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
