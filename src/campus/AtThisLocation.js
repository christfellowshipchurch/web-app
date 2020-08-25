import React from 'react';
import PropTypes from 'prop-types';

import { CardGrid } from '../ui';

const AtThisLocation = ({ features }) => {
  return <CardGrid data={features} />;
};

AtThisLocation.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      summary: PropTypes.string,
      icon: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
      htmlContent: PropTypes.string,
    })
  ),
};

AtThisLocation.defaultProps = {
  features: [],
};

export default AtThisLocation;
