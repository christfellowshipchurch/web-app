import React from 'react';
import PropTypes from 'prop-types';

import Swoop from './Swoop';
import Standard from './Standard';

const PageBuilder = ({ theme, ...props }) => {
  // switch (theme) {
  //   case 'swoop':
  //     return <Swoop {...props} />;
  //   default:
  //     return <Standard {...props} />;
  // }
  return <Standard {...props} />;
};

PageBuilder.propTypes = {
  theme: PropTypes.oneOf(['swoop', 'standard']),
};

PageBuilder.defaultProps = {
  theme: 'standard',
};

export default PageBuilder;
