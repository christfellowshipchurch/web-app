import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const GridContainer = ({ children, fluid, className, ...props }) => (
  <div
    className={classnames(
      {
        container: !fluid,
        'container-fluid': fluid,
      },
      className
    )}
    {...props}
  >
    {children}
  </div>
);

GridContainer.propTypes = {
  children: PropTypes.node,
  fluid: PropTypes.bool,
  className: PropTypes.string,
};

GridContainer.defaultProps = {
  fluid: false,
  children: null,
};

export default GridContainer;
