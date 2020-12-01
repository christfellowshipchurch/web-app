import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GroupResourceProp } from '../NewGroupContentItemConnected/GroupResources';
import { Loader } from '../../ui';
import EditResourceContentItem from './EditResourceContentItem';
import DeleteResource from './DeleteResource';

export default function ResourceContentItem({ resource, groupId, resources = [] }) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [resource]);

  if (loading) return <Loader />;

  return editing ? (
    <EditResourceContentItem
      groupId={groupId}
      resource={resource}
      onCancel={() => setEditing(false)}
      resources={resources}
    />
  ) : (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <div
      // onClick={() => setEditing(true)} /* ⚠️ Temporarily Disabled */
      >
        <span>{resource?.title}</span>
      </div>
      <DeleteResource
        groupId={groupId}
        resource={resource}
        onDelete={() => setLoading(true)}
      />
    </div>
  );
}

ResourceContentItem.propTypes = {
  resource: GroupResourceProp,
  resources: PropTypes.arrayOf(GroupResourceProp),
  groupId: PropTypes.string,
};
