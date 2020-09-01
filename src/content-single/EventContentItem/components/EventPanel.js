import React from 'react';
import PropTypes from 'prop-types';

import EventChat from './EventChat';

const EventPanel = ({}) => (
  <div className="h-100 bg-white">
    <EventChat />
  </div>
);

EventPanel.propTypes = {};

EventPanel.defaultProps = {};

export default EventPanel;
