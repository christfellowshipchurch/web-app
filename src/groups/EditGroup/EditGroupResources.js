import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  GroupResourceProp,
  processResource,
} from '../NewGroupContentItemConnected/GroupResources';
import GroupImage from '../NewGroupContentItemConnected/GroupImage';
import EditGroupItem from './EditGroupItem';
import ResourceUrl from './ResourceUrl';
import ResourceContentItem from './ResourceContentItem';
import AddResource from './AddResource';
import ResourceDetails from './ResourceDetails';

export default function EditGroupResources({ groupId, refetchData, resources }) {
  const [addingResource, setAddingResource] = useState(false);

  const processedResources = resources.map(processResource);

  // Upon refetching resource data after adding/updating a resource,
  // Reset resources area to show list of resources instead of form
  useEffect(() => {
    setAddingResource(false);
  }, [resources]);

  return addingResource ? (
    <EditGroupItem
      title="Resources"
      action={() => setAddingResource(false)}
      actionLabel="Cancel"
    >
      <AddResource groupId={groupId} refetchData={refetchData} />
    </EditGroupItem>
  ) : (
    <EditGroupItem
      title="Resources"
      action={() => setAddingResource(true)}
      actionLabel="Add"
    >
      {processedResources.map((resource) => (
        <ResourceDetails key={resource.id} className="my-2 text-dark">
          {resource.action === 'OPEN_URL' ? (
            <ResourceUrl resource={resource} groupId={groupId} />
          ) : (
            <ResourceContentItem resource={resource} groupId={groupId} />
          )}
        </ResourceDetails>
      ))}
    </EditGroupItem>
  );
}

EditGroupResources.propTypes = {
  visible: PropTypes.bool,
  resources: PropTypes.arrayOf(GroupResourceProp),
  onPressExit: PropTypes.func,
  groupId: PropTypes.string,
  refetchData: PropTypes.func,
  coverImage: GroupImage.propTypes.coverImage,
};
