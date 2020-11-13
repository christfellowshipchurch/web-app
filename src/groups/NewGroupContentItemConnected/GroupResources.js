import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { GoogleAnalytics } from 'analytics';

import { get } from 'lodash';

import { baseUnit, themeGet } from 'styles/theme';

import { useInteraction, ACTIONS } from 'mutations';
import { Card, generateUrlLink } from 'ui';

// :: Styled Components
// ------------------------

const ResourcesHeading = styled.h4`
  margin-bottom: 0;
  padding: ${baseUnit(2)} 0;
  border-bottom: 3px solid transparent; // Ugly, but needs to match with GroupTab component style
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

  const processedResources = resources.map((resource) => {
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
  });

  return (
    <>
      <ResourcesHeading>Resources</ResourcesHeading>
      <Card>
        {processedResources?.length === 0 && (
          <EmptyStateText>No group resources</EmptyStateText>
        )}
        {processedResources.map((resource, index) => (
          <a
            key={resource?.url || `resource-${index}`}
            className="btn btn-outline-dark btn-block text-dark"
            href={resource?.url}
            onClick={() => {
              onResourceClick({
                resourceTitle: resource?.title,
              });

              GoogleAnalytics.trackEvent({
                category: 'Event Item',
                action: `${resource.title} - Group Resource Action`,
                label: `${resource.title} Button`,
              });

              interaction({
                variables: {
                  nodeId: resource.relatedNode.id,
                  action: ACTIONS.GROUP_RESOURCE_OPEN_URL,
                },
              });
            }}
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
