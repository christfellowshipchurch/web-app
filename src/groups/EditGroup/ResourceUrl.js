import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { theme } from 'styles/theme';
import { GroupResourceProp } from '../NewGroupContentItemConnected/GroupResources';
import EditResourceUrl from './EditResourceUrl';
import DeleteResource from './DeleteResource';

export default function ResourceUrl({ resource, groupId, refetchData }) {
  const [editing, setEditing] = useState(false);

  return editing ? (
    <EditResourceUrl
      groupId={groupId}
      resource={resource}
      refetchData={refetchData}
      onCancel={() => setEditing(false)}
    />
  ) : (
    <div
      style={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}
      onClick={() => setEditing(true)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {resource?.title}
        <div style={{ fontSize: theme.fontSize.xsmall }}>{resource.url}</div>
      </div>
      <DeleteResource groupId={groupId} resource={resource} />
    </div>
  );
}

ResourceUrl.propTypes = {
  resource: GroupResourceProp,
  groupId: PropTypes.string,
  refetchData: PropTypes.func,
};
