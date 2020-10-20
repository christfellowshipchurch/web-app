import React from 'react';
import PropTypes from 'prop-types';

const GroupResources = ({ groupResources, onClick }) => (
  <div>
    <h3>Resources</h3>
    {groupResources.map((resource, i) => (
      <a
        key={resource.url}
        className="btn btn-outline-dark btn-block my-3"
        href={resource.url}
        onClick={() =>
          onClick({
            resourceTitle: resource.title,
          })
        }
        target={resource.url.includes('http') ? '_blank' : ''}
      >
        {resource.title}
      </a>
    ))}
  </div>
);

GroupResources.propTypes = {
  groupResources: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  onClick: PropTypes.func,
};

export default GroupResources;
