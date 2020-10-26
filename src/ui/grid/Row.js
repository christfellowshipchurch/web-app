import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ children, className, ...props }) => (
  <div className={className ? `row ${className}` : 'row'} {...props}>
    {children}
  </div>
);

Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Row.defaultProps = {
  children: null,
};

export default Row;
