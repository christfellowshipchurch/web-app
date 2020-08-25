import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ContentContainer = ({ children, className }) => (
  <div className={classnames('container-fluid', className)}>
    <div className="row">
      <div className="col">{children}</div>
    </div>
  </div>
);

ContentContainer.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

ContentContainer.defaultProps = {
  children: [],
  className: '',
};

export default ContentContainer;
