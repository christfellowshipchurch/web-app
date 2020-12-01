import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { themeGet } from 'styles/theme';

import { ProcessedResourceProps } from '../NewGroupContentItemConnected/GroupResources';

import EditResourceUrl from './EditResourceUrl';
import DeleteResource from './DeleteResource';

// :: Styled Components
// ------------------------

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  flex: 1;
`;

const UrlLabel = styled.span`
  font-size: ${themeGet('fontSize.small')};
  color: ${themeGet('font.400')};
`;

// :: Main Component
// ------------------------

export default function ResourceUrl({ resource, groupId, resources = [] }) {
  const [editing, setEditing] = useState(false);

  return editing ? (
    <EditResourceUrl
      groupId={groupId}
      resource={resource}
      resources={resources}
      onCancel={() => setEditing(false)}
    />
  ) : (
    <Container>
      <div
        style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
        // onClick={() => setEditing(true)} /* ⚠️ Temporarily Disabled */
      >
        {resource?.title}
        <UrlLabel>{resource.url}</UrlLabel>
      </div>
      <DeleteResource groupId={groupId} resource={resource} />
    </Container>
  );
}

ResourceUrl.propTypes = {
  resource: ProcessedResourceProps,
  groupId: PropTypes.string,
  resources: PropTypes.arrayOf(ProcessedResourceProps),
};
