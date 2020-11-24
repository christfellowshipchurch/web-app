import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { theme } from 'styles/theme';
import { ProcessedResourceProps } from '../NewGroupContentItemConnected/GroupResources';
import { Loader } from '../../ui';
import EditResourceUrl from './EditResourceUrl';
import DeleteResource from './DeleteResource';

export default function ResourceUrl({ resource, groupId, resources = [] }) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [resources]);

  if (loading) return <Loader />;

  return editing ? (
    <EditResourceUrl
      groupId={groupId}
      resource={resource}
      resources={resources}
      onCancel={() => setEditing(false)}
    />
  ) : (
    <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}>
      <div
        style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
        onClick={() => setEditing(true)}
      >
        {resource?.title}
        <div style={{ fontSize: theme.fontSize.xsmall }}>{resource.url}</div>
      </div>
      <DeleteResource
        groupId={groupId}
        resource={resource}
        onDelete={() => setLoading(true)}
      />
    </div>
  );
}

ResourceUrl.propTypes = {
  resource: ProcessedResourceProps,
  groupId: PropTypes.string,
  resources: PropTypes.arrayOf(ProcessedResourceProps),
};
