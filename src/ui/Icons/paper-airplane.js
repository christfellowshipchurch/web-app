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
    <path
      d="M23.7107,1.2467a1.4834,1.4834,0,0,0-.3465-.5676c-.0086-.01-.0115-.0218-.0206-.031C23.3312.6358,23.3148.6317,23.3019.62A1.4938,1.4938,0,0,0,21.8182.2853L1.7415,6.8337a2.2366,2.2366,0,0,0,.1035,4.2734l.0288.0078,8.8755,2.1284,2.1455,8.9112a2.2359,2.2359,0,0,0,4.2759.1005l6.543-20.0859A1.5027,1.5027,0,0,0,23.7107,1.2467ZM1.743,8.7541a.7345.7345,0,0,1,.4692-.4966L20.707,2.2242l-9.5693,9.57L2.2405,9.66A.7385.7385,0,0,1,1.743,8.7541ZM15.7459,21.7853a.7381.7381,0,0,1-.9316.4649.7229.7229,0,0,1-.4678-.4737l-2.1483-8.9221,9.5769-9.5773Z"
      fill={fill}
    />
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
