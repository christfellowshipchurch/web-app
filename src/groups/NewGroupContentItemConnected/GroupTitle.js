import React from 'react';
import PropTypes from 'prop-types';

const GroupTitle = ({ title }) => <h1 className="mb-2 text-dark">{title}</h1>;

GroupTitle.propTypes = {
  title: PropTypes.string,
};

export default GroupTitle;
