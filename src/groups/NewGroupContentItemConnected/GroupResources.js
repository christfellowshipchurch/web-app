import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { GoogleAnalytics } from 'analytics';

import { get } from 'lodash';

import { baseUnit, themeGet } from 'styles/theme';

import { useInteraction } from 'mutations';
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
    id: resource.relatedNode.id,
    title: resource.title,
    url: resourceURL,
    action: resource.action,
  };
}

export const ProcessedResourceProps = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  action: PropTypes.string,
});

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
  const [interaction] = useInteraction();
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
            onClick={() => {
              GoogleAnalytics.trackEvent({
                category: 'Event Item',
                action: `${resource.title} - Group Resource Action`,
                label: `${resource.title} Button`,
              });

              interaction({
                variables: {
                  nodeId: resource.id,
                  action: `GROUP_${resource.action}`,
                },
              });

              onResourceClick({
                resourceTitle: resource?.title,
              });
            }}
            href={resource?.url}
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
