import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { get } from 'lodash';

import { baseUnit, themeGet } from 'styles/theme';

import { Card, generateUrlLink } from 'ui';

export function processResource(resource) {
  let resourceURL = get(resource, 'relatedNode.url', '');

  if (resource.action === 'READ_CONTENT') {
    const urlBase =
      resource.relatedNode.__typename === 'InformationalContentItem'
        ? 'items'
        : 'content';

    const { href } = generateUrlLink({
      urlBase,
      id: resource.relatedNode.id,
      title: resource.title,
    });

    resourceURL = href;
  }

  return {
    title: resource.title,
    url: resourceURL,
  };
}

// :: Styled Components
// ------------------------

const ResourcesHeading = styled.h4`
  margin-bottom: 0;
  padding: ${baseUnit(2)} 0;
  border-bottom: 3px solid transparent; // Ugly, but needs to match with GroupTab component style
  display: flex;
  justify-content: space-between;
`;

const EmptyStateText = styled.p`
  color: ${themeGet('font.300')};
  margin: ${baseUnit(4)} 0;
  text-align: center;
`;

// :: Main Component
// ------------------------

const GroupResources = ({ resources = [], onResourceClick }) => {
  const processedResources = resources.map(processResource);

  return (
    <>
      <ResourcesHeading>Resources</ResourcesHeading>
      <Card className="mb-3">
        {processedResources?.length === 0 && (
          <EmptyStateText>No group resources</EmptyStateText>
        )}
        {processedResources.map((resource, index) => (
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
            rel="noopener noreferrer"
          >
            {resource?.title}
          </a>
        ))}
      </Card>
    </>
  );
};

export const GroupResourceProp = PropTypes.shape({
  title: PropTypes.string,
  url: PropTypes.string,
});

GroupResources.propTypes = {
  resources: PropTypes.arrayOf(GroupResourceProp),
  onResourceClick: PropTypes.func,
  onEditClick: PropTypes.func,
};

export default GroupResources;
