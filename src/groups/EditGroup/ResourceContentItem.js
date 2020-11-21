import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GroupResourceProp } from '../NewGroupContentItemConnected/GroupResources';
import EditResourceContentItem from './EditResourceContentItem';
import DeleteResource from './DeleteResource';

export default function ResourceContentItem({ resource, groupId, refetchData }) {
  const [editing, setEditing] = useState(false);

  return editing ? (
    <EditResourceContentItem
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
      {resource?.title}
      <DeleteResource groupId={groupId} resource={resource} />
    </div>
  );
}

ResourceContentItem.propTypes = {
  resource: GroupResourceProp,
  groupId: PropTypes.string,
  refetchData: PropTypes.func,
};
