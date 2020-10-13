import React from 'react';
import PropTypes from 'prop-types';

const GroupSummary = ({ summary }) =>
  summary ? (
    <div className="mb-2 text-dark" style={{ maxHeight: '7.5rem', overflowY: 'scroll' }}>
      {summary}
    </div>
  ) : null;

GroupSummary.propTypes = {
  summary: PropTypes.string,
};

export default GroupSummary;
