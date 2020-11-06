import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { baseUnit } from 'styles/theme';

import { Card } from 'ui';

// :: Styled Components
// ------------------------

const ResourcesHeading = styled.h4`
  margin-bottom: 0;
  padding: ${baseUnit(2)} 0;
  border-bottom: 3px solid transparent; // Ugly, but needs to match with GroupTab component style
`;

// :: Main Component
// ------------------------

const GroupResources = ({ resources, onResourceClick }) => (
  <>
    <ResourcesHeading>Resources</ResourcesHeading>
    <Card>
      {resources.map((resource, index) => (
        <a
          key={resource?.url || `resource-${index}`}
          className="btn btn-outline-dark btn-block text-dark"
          href={resource?.url}
          onClick={() =>
            onResourceClick({
              resourceTitle: resource?.title,
            })
          }
          target={resource?.url?.includes('http') ? '_blank' : ''}
        >
          {resource?.title}
        </a>
      ))}
    </Card>
  </>
);

GroupResources.propTypes = {
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  onResourceClick: PropTypes.func,
};

export default GroupResources;
