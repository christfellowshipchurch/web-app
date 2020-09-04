import React from 'react';
import PropTypes from 'prop-types';

const EventPanel = ({ children }) => <div className="h-100 bg-white">{children}</div>;

EventPanel.propTypes = {
  children: PropTypes.node,
};

EventPanel.defaultProps = {};

export default EventPanel;
